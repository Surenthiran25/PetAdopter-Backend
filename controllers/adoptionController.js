const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');

// @desc    Get all adoptions
// @route   GET /api/adoptions
// @access  Private (Admin)
exports.getAdoptions = async (req, res, next) => {
  try {
    let query;

    // Admin can see all adoptions, users can only see their own
    if (req.user.role === 'admin') {
      query = Adoption.find();
    } else {
      query = Adoption.find({ user: req.user.id });
    }

    // Add pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Adoption.countDocuments(query);

    query = query.skip(startIndex).limit(limit);

    // Populate references
    query = query.populate({
      path: 'pet',
      select: 'name species breed photos adoptionStatus'
    }).populate({
      path: 'user',
      select: 'name email'
    });

    // Execute query
    const adoptions = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: adoptions.length,
      pagination,
      data: adoptions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single adoption
// @route   GET /api/adoptions/:id
// @access  Private
exports.getAdoption = async (req, res, next) => {
  try {
    const adoption = await Adoption.findById(req.params.id)
      .populate({
        path: 'pet',
        select: 'name species breed photos adoptionStatus adoptionFee description'
      })
      .populate({
        path: 'user',
        select: 'name email phone address'
      });

    if (!adoption) {
      return res.status(404).json({
        success: false,
        message: `Adoption not found with id of ${req.params.id}`
      });
    }

    // Make sure user is adoption owner or admin
    if (adoption.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: `User ${req.user.id} is not authorized to access this adoption`
      });
    }

    res.status(200).json({
      success: true,
      data: adoption
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create adoption request
// @route   POST /api/adoptions
// @access  Private
exports.createAdoption = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check if pet exists
    const pet = await Pet.findById(req.body.pet);
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: `Pet not found with id of ${req.body.pet}`
      });
    }

    // Check if pet is available for adoption
    if (pet.adoptionStatus !== 'Available') {
      return res.status(400).json({
        success: false,
        message: `Pet is not available for adoption, current status: ${pet.adoptionStatus}`
      });
    }

    // Check if user already has a pending request for this pet
    const existingAdoption = await Adoption.findOne({
      user: req.user.id,
      pet: req.body.pet,
      status: 'Pending'
    });

    if (existingAdoption) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending adoption request for this pet'
      });
    }

    const adoption = await Adoption.create(req.body);

    // Update pet status to 'Pending'
    await Pet.findByIdAndUpdate(req.body.pet, { adoptionStatus: 'Pending' });

    res.status(201).json({
      success: true,
      data: adoption
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update adoption status
// @route   PUT /api/adoptions/:id/status
// @access  Private (Admin)
exports.updateAdoptionStatus = async (req, res, next) => {
  try {
    const { status, adminComments } = req.body;

    if (!status || !['Pending', 'Approved', 'Rejected', 'Cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid status'
      });
    }

    let adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({
        success: false,
        message: `Adoption not found with id of ${req.params.id}`
      });
    }

    // Only admins can approve/reject
    if ((status === 'Approved' || status === 'Rejected') && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to change adoption status'
      });
    }

    // Users can only cancel their own requests
    if (status === 'Cancelled' && 
        adoption.user.toString() !== req.user.id && 
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this adoption request'
      });
    }

    // Update adoption
    adoption = await Adoption.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminComments: adminComments || adoption.adminComments,
        decisionDate: new Date()
      },
      { new: true, runValidators: true }
    );

    // Update pet status based on adoption status
    const pet = await Pet.findById(adoption.pet);
    
    if (status === 'Approved') {
      await Pet.findByIdAndUpdate(adoption.pet, { adoptionStatus: 'Adopted' });
      
      // Reject other pending adoption requests for this pet
      await Adoption.updateMany(
        { pet: adoption.pet, _id: { $ne: adoption._id }, status: 'Pending' },
        { status: 'Rejected', adminComments: 'Pet was adopted by another user', decisionDate: new Date() }
      );
    } else if (status === 'Rejected' || status === 'Cancelled') {
      // Check if there are other pending requests for this pet
      const pendingRequests = await Adoption.countDocuments({
        pet: adoption.pet,
        status: 'Pending',
        _id: { $ne: adoption._id }
      });
      
      // If no other pending requests, set pet status back to Available
      if (pendingRequests === 0) {
        await Pet.findByIdAndUpdate(adoption.pet, { adoptionStatus: 'Available' });
      }
    }

    res.status(200).json({
      success: true,
      data: adoption
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete adoption
// @route   DELETE /api/adoptions/:id
// @access  Private (Admin)
exports.deleteAdoption = async (req, res, next) => {
  try {
    const adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({
        success: false,
        message: `Adoption not found with id of ${req.params.id}`
      });
    }

    // Make sure only admin can delete
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete adoption records'
      });
    }

    await adoption.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user adoption history
// @route   GET /api/adoptions/history
// @access  Private
exports.getUserAdoptionHistory = async (req, res, next) => {
  try {
    const adoptions = await Adoption.find({ user: req.user.id })
      .populate({
        path: 'pet',
        select: 'name species breed photos'
      });

    res.status(200).json({
      success: true,
      count: adoptions.length,
      data: adoptions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get pet adoption requests
// @route   GET /api/adoptions/pet/:petId
// @access  Private (Admin)
exports.getPetAdoptionRequests = async (req, res, next) => {
  try {
    const adoptions = await Adoption.find({ pet: req.params.petId })
      .populate({
        path: 'user',
        select: 'name email phone'
      });

    res.status(200).json({
      success: true,
      count: adoptions.length,
      data: adoptions
    });
  } catch (error) {
    next(error);
  }
};
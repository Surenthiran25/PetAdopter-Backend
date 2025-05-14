const Pet = require('../models/Pet');

// @desc    Get all pets
// @route   GET /api/pets
// @access  Public
exports.getPets = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Pet.find(JSON.parse(queryStr));

    // Search functionality
    if (req.query.search) {
      query = Pet.find({ $text: { $search: req.query.search } });
    }

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Pet.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const pets = await query;

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
      count: pets.length,
      pagination,
      data: pets
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single pet
// @route   GET /api/pets/:id
// @access  Public
exports.getPet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: `Pet not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new pet
// @route   POST /api/pets
// @access  Private (Admin)
exports.createPet = async (req, res, next) => {
  try {
    // Add photos from uploaded files if available
    if (req.files && req.files.length > 0) {
      req.body.photos = req.files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        isMain: index === 0 // First uploaded photo is the main one
      }));
    }

    const pet = await Pet.create(req.body);

    res.status(201).json({
      success: true,
      data: pet
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update pet
// @route   PUT /api/pets/:id
// @access  Private (Admin)
exports.updatePet = async (req, res, next) => {
  try {
    let pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: `Pet not found with id of ${req.params.id}`
      });
    }

    // Add new photos if available
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => ({
        url: file.path,
        publicId: file.filename,
        isMain: false
      }));

      // Append new photos to existing ones
      if (!req.body.photos) {
        req.body.photos = [...pet.photos, ...newPhotos];
      }
    }

    pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete pet
// @route   DELETE /api/pets/:id
// @access  Private (Admin)
exports.deletePet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: `Pet not found with id of ${req.params.id}`
      });
    }

    await pet.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update pet adoption status
// @route   PUT /api/pets/:id/status
// @access  Private (Admin)
exports.updatePetStatus = async (req, res, next) => {
  try {
    const { adoptionStatus } = req.body;

    if (!adoptionStatus || !['Available', 'Pending', 'Adopted'].includes(adoptionStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid adoption status'
      });
    }

    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { adoptionStatus },
      { new: true, runValidators: true }
    );

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: `Pet not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    next(error);
  }
};
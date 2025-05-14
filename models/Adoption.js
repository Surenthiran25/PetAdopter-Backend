const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
      default: 'Pending'
    },
    applicationDetails: {
      residenceType: {
        type: String,
        enum: ['House', 'Apartment', 'Condo', 'Other'],
        required: [true, 'Please specify your residence type']
      },
      hasYard: {
        type: Boolean,
        required: [true, 'Please specify if you have a yard']
      },
      hasChildren: {
        type: Boolean,
        required: [true, 'Please specify if you have children']
      },
      hasOtherPets: {
        type: Boolean,
        required: [true, 'Please specify if you have other pets']
      },
      otherPetsDescription: String,
      petExperience: {
        type: String,
        required: [true, 'Please describe your pet care experience']
      },
      workSchedule: {
        type: String,
        required: [true, 'Please describe your work schedule']
      },
      additionalComments: String
    },
    adminComments: {
      type: String
    },
    decisionDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Ensure user can only have one pending adoption request per pet
AdoptionSchema.index({ user: 1, pet: 1 }, { unique: true });

module.exports = mongoose.model('Adoption', AdoptionSchema);
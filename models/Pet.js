const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a pet name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    species: {
      type: String,
      required: [true, 'Please specify the species'],
      enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Guinea Pig', 'Fish', 'Turtle', 'Other'],
    },
    breed: {
      type: String,
      required: [true, 'Please add the breed'],
      trim: true
    },
    age: {
      years: {
        type: Number,
        min: [0, 'Age cannot be negative']
      },
      months: {
        type: Number,
        min: [0, 'Months cannot be negative'],
        max: [11, 'Months cannot be more than 11']
      }
    },
    size: {
      type: String,
      enum: ['Small', 'Medium', 'Large', 'Extra Large'],
      required: [true, 'Please specify the size']
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Unknown'],
      required: [true, 'Please specify the gender']
    },
    color: {
      type: String,
      required: [true, 'Please add the color']
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    photos: [{
      url: {
        type: String,
        required: true
      },
      publicId: String,
      isMain: {
        type: Boolean,
        default: false
      }
    }],
    medical: {
      vaccinated: {
        type: Boolean,
        default: false
      },
      neutered: {
        type: Boolean,
        default: false
      },
      specialNeeds: {
        type: Boolean,
        default: false
      },
      specialNeedsDescription: String
    },
    behavior: {
      goodWithKids: {
        type: Boolean,
        default: true
      },
      goodWithOtherPets: {
        type: Boolean,
        default: true
      },
      activityLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
      }
    },
    adoptionStatus: {
      type: String,
      enum: ['Available', 'Pending', 'Adopted'],
      default: 'Available'
    },
    adoptionFee: {
      type: Number,
      required: [true, 'Please add an adoption fee'],
      min: [0, 'Fee cannot be negative']
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexing for search performance
PetSchema.index({ name: 'text', breed: 'text', description: 'text' });
PetSchema.index({ species: 1, breed: 1, adoptionStatus: 1, size: 1, gender: 1 });

// Virtual for adoption requests
PetSchema.virtual('adoptionRequests', {
  ref: 'Adoption',
  localField: '_id',
  foreignField: 'pet',
  justOne: false
});

module.exports = mongoose.model('Pet', PetSchema);
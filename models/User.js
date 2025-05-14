const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    phone: {
      type: String,
      match: [
        /^\+?([0-9]{1,3})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        'Please add a valid phone number'
      ]
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual for adoptions
UserSchema.virtual('adoptions', {
  ref: 'Adoption',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

module.exports = mongoose.model('User', UserSchema);
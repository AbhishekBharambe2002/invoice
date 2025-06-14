const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['SUPER-ADMIN', 'ADMIN', 'UNIT MANAGER', 'USER'],
    required: true,
  },

  userId: {
    type: String,
    required: true,
    unique: true,
  },

  creatorId: {
    type: String, // userId of the creator (Admin, Unit Manager, etc.)
    default: null,
  },

  group: {
    type: String,
    default: null, // For AdminGroup or UnitGroup
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);

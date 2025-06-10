const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  financialYear: {
    type: String,
    required: true,
  },

  createdBy: {
    type: String, // userId of the creator
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure unique invoice number per financial year
invoiceSchema.index({ number: 1, financialYear: 1 }, { unique: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
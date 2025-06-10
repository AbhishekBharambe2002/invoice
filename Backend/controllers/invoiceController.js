const Invoice = require('../models/Invoice.js');
const { validateInvoiceDate } = require('../utils/validation.js');

// Create Invoice
 const createInvoice = async (req, res) => {
  const { number, date, amount, financialYear } = req.body;

  try {
    const isValid = await validateInvoiceDate(number, date, financialYear);
    if (!isValid) return res.status(400).json({ message: 'Invalid invoice date' });

    const invoice = new Invoice({ number, date, amount, financialYear, createdBy: req.user._id });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Invoice
 const updateInvoice = async (req, res) => {
  const { number } = req.params;
  const updateData = req.body;
  try {
    const invoice = await Invoice.findOneAndUpdate({ number }, updateData, { new: true });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Invoices
 const deleteInvoices = async (req, res) => {
  const { numbers } = req.body;
  try {
    await Invoice.deleteMany({ number: { $in: numbers } });
    res.json({ message: 'Invoices deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Invoices
 const getInvoices = async (req, res) => {
  const { page = 1, limit = 10, fy, startDate, endDate, search } = req.query;
  const filter = {};

  if (fy) filter.financialYear = fy;
  if (startDate && endDate) filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  if (search) filter.number = new RegExp(search, 'i');

  try {
    const invoices = await Invoice.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const count = await Invoice.countDocuments(filter);
    res.json({ invoices, totalPages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createInvoice,
  updateInvoice,
  deleteInvoices,
  getInvoices,
};
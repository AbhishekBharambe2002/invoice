const Invoice = require('../models/Invoice.js');

 const validateInvoiceDate = async (number, date, fy) => {
  const invoiceNum = parseInt(number);

  const prevInvoice = await Invoice.findOne({ number: invoiceNum - 1, financialYear: fy });
  const nextInvoice = await Invoice.findOne({ number: invoiceNum + 1, financialYear: fy });

  const invoiceDate = new Date(date);
  if (prevInvoice && new Date(prevInvoice.date) > invoiceDate) return false;
  if (nextInvoice && new Date(nextInvoice.date) < invoiceDate) return false;

  return true;
};
module.exports = { validateInvoiceDate };
// This function checks if the invoice date is valid based on the previous and next invoice dates
const express = require('express');
const {
  createInvoice,
  updateInvoice,
  deleteInvoices,
  getInvoices,
} = require('../controllers/invoiceController.js');

const { verifyToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', verifyToken, createInvoice);
router.put('/:number', verifyToken, updateInvoice);
router.delete('/', verifyToken, deleteInvoices);
router.get('/', verifyToken, getInvoices);

module.exports = router;

const express = require('express');
const {
  createUser,
  updateUserRole,
  deleteUser,
  getUsers,
} = require('../controllers/userController.js');

const { verifyToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', verifyToken, createUser);
router.put('/role', verifyToken, updateUserRole);
router.delete('/', verifyToken, deleteUser);
router.get('/', verifyToken, getUsers);

module.exports = router;

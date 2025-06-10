const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const { generateUserId } = require('../utils/idGenerator.js');

// Create User
 const createUser = async (req, res) => {
  const { name, email, role, password, creatorId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await generateUserId(role);

    const user = new User({ name, email, role, password: hashedPassword, userId, creatorId });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update User Role
 const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    const user = await User.findOneAndUpdate({ userId }, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete User(s)
 const deleteUser = async (req, res) => {
  const { userIds } = req.body;
  try {
    await User.deleteMany({ userId: { $in: userIds } });
    res.json({ message: 'Users deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List Users with pagination
 const getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const count = await User.countDocuments();
    res.json({ users, totalPages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createUser,
  updateUserRole,
  deleteUser,
  getUsers,
};
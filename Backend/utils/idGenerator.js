const User = require('../models/User.js');

 const generateUserId = async (role) => {
  const prefix = role === 'ADMIN' ? 'A' : role === 'UNIT MANAGER' ? 'UM' : 'U';
  const count = await User.countDocuments({ role });
  return `${prefix}${count + 1}`;
};
module.exports = { generateUserId };
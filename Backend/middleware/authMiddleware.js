const jwt = require('jsonwebtoken');
const User = require('../models/User'); // adjust path if needed

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('_id email'); // or whatever you want
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // now req.user._id is available
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = { verifyToken };

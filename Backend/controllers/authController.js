const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

const login = async (req, res) => {
  const { email, password, timezone } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid Credentials' });

    if (!moment.tz.zone(timezone)) {
      return res.status(400).json({ message: 'Invalid Timezone' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { login };
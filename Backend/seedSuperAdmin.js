// seedSuperAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");

    const email = 'superadmin@example.com';
    const existing = await User.findOne({ email });

    if (existing) {
      console.log('✅ SuperAdmin already exists.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const user = new User({
      name: 'SuperAdmin',
      email,
      password: hashedPassword,
      role: 'SUPER-ADMIN',
      userId: 'SA1', // You can generate this dynamically if needed
      creatorId: null,
      group: null
    });

    await user.save();
    console.log('✅ SuperAdmin seeded successfully with email:', email);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding SuperAdmin:', err);
    process.exit(1);
  }
};

seedSuperAdmin();

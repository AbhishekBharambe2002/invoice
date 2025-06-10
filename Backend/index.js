const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Routes
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/users.js');
const invoiceRoutes = require('./routes/invoices.js');

// Config
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Route Mounting
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

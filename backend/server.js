const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Force Google DNS - hostel/restricted networks often block DNS SRV/TXT queries
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(MONGODB_URI, {
        family: 4, // Force IPv4
      });
      console.log('✅ Connected to MongoDB Atlas');
      return;
    } catch (err) {
      console.error(`❌ MongoDB attempt ${i + 1}/${retries} failed:`, err.message);
      if (i < retries - 1) {
        const delay = Math.pow(2, i) * 1000;
        console.log(`⏳ Retrying in ${delay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error('All MongoDB connection attempts failed. Server continues without DB.');
};

connectDB();

// Admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// Auth routes (login, signup, orders)
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Public routes
const publicRoutes = require('./routes/publicRoutes');
app.use('/api', publicRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle React routing, return all requests to React app
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

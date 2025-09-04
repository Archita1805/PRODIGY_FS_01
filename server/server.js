const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration - Sirf ek baar configure kariye
app.use(cors({
  origin: 'http://localhost:3000', // Frontend port ke according change kiya
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Agar cookies use kar rahe hain to ye add kariye
}));

// Routes
app.use('/api/auth', authRoutes);

// Example protected route (optional)
const authMiddleware = require('./middleware/auth');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is protected data', userId: req.user.id });
});

// Test route to check if server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const PORT = process.env.PORT || 5000;

// MongoDB Connection - Deprecated options remove kar diye
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
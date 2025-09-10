import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serviceRoutes from './routes/serviceAPI.js';
import authRoutes from './routes/authAPI.js';
// ...existing code...

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Auth routes
app.use('/api/auth', authRoutes);

// Public route for related to service entries
app.use('/api/service', serviceRoutes);

// ...existing code...

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Morya Automobiles Service API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

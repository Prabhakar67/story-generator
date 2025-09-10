import express from 'express';
import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, roles: ['admin'] },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      roles: ['admin'],
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Initialize admin user
// ...existing code...

export default router;

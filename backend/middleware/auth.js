import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    // Check if roles array includes 'admin'
    if (!decoded.roles || !decoded.roles.includes('admin')) {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

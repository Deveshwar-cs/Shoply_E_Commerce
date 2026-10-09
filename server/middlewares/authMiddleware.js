import User from '../models/userModel.js';
import { auth } from '../firebase/index.js';

// Verify Firebase token from client
export const authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authtoken;

    if (!token) {
      return res.status(401).json({
        error: 'No authentication token provided',
      });
    }
    console.log(req.headers.authtoken);
    const firebaseUser = await auth.verifyIdToken(token);

    req.user = firebaseUser;
    next();
  } catch (error) {
    console.error('Firebase authentication error:', error);

    return res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
};

export const adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });

    if (!adminUser) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    if (adminUser.role !== 'admin') {
      return res.status(403).json({
        error: 'Admin resource. Access denied.',
      });
    }
    next();
  } catch (error) {
    console.error('Admin check error:', error);

    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
};

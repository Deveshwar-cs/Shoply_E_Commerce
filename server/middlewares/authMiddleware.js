const admin = require('../firebase');
const User = require('../models/userModel');

// virufy token from client with firebase-admin
exports.authCheck = async (req, res, next) => {
  //console.log('authCheck middleware', req.headers);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log('FIREBASE USER IN AUTHCHECK', firebaseUser);

    req.user = firebaseUser;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  //console.log('authCheck middleware', req.headers);
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== 'admin') {
    res.status(403).json({
      error: 'Admin resource. Access denied.',
    });
  }
  next();
};

const express = require('express');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const cloudinaryController = require('../controllers/cloudinaryController');

const router = express.Router();

router.post(
  '/images',
  authCheck,
  adminCheck,
  cloudinaryController.uploadImages
);

router.delete(
  '/images',
  authCheck,
  adminCheck,
  cloudinaryController.deleteImage
);

module.exports = router;

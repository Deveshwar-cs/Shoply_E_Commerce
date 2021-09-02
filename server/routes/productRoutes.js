const express = require('express');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const productController = require('../controllers/productController');

const router = express.Router();

router.post(
  '/products',
  authCheck,
  adminCheck,
  productController.createProduct
);

module.exports = router;

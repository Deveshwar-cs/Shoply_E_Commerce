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

router.get('/products/:count', productController.getAllProducts);

router.get('/product/:slug', productController.getOneProduct);

router.delete(
  '/products/:slug',
  authCheck,
  adminCheck,
  productController.deleteProduct
);

module.exports = router;

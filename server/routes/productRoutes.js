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

// get products total count alias for pagination
router.get('/totalproducts', productController.productsCount);

router.get('/products/:count', productController.getAllProducts);

router.get('/product/:slug', productController.getOneProduct);

router.delete(
  '/products/:slug',
  authCheck,
  adminCheck,
  productController.deleteProduct
);

router.put(
  '/products/:slug',
  authCheck,
  adminCheck,
  productController.updateProduct
);

// get list of products with sort, filter or limit
// using POST becouse we need send some data with request
router.post('/customproductlist', productController.customProductList);

router.put(
  '/product/star/:productId',
  authCheck,
  productController.productRating
);

// related products
router.get('/products/related/:productId', productController.relatedProducts);

// search
router.post('/search/filters', productController.searchFilters);
module.exports = router;

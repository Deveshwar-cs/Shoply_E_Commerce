import express from 'express';
// middlewares
import { authCheck, adminCheck } from '../middlewares/authMiddleware.js';

// controllers
import {
  createProduct,
  productsCount,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  customProductList,
  productRating,
  relatedProducts,
  searchFilters,
} from '../controllers/productController.js';
const router = express.Router();

router.post('/products', authCheck, adminCheck, createProduct);

// get products total count alias for pagination
router.get('/totalproducts', productsCount);

router.get('/products/:count', getAllProducts);

router.get('/product/:slug', getOneProduct);

router.delete('/products/:slug', authCheck, adminCheck, deleteProduct);

router.put('/products/:slug', authCheck, adminCheck, updateProduct);

// get list of products with sort, filter or limit
// using POST becouse we need send some data with request
router.post('/customproductlist', customProductList);

router.put('/product/star/:productId', authCheck, productRating);

// related products
router.get('/products/related/:productId', relatedProducts);

// search
router.post('/search/filters', searchFilters);

export default router;

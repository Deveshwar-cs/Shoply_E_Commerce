import express from 'express';
// middlewares
import { authCheck } from '../middlewares/authMiddleware.js';

// controllers
import {
  createCart,
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  getUserAddress,
  applyCouponToUserCart,
  createOrder,
  createOrderCashPayment,
  getAllOrdersByUser,
  addToWishlist,
  getWishlist,
  updateWishlist,
  removeProductCart,
  updateProductCartQuantity,
} from '../controllers/cartAndWishlistController.js';

const router = express.Router();

// User cart routes
router.post('/user/cart', authCheck, createCart); // save cart by user in DB
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyUserCart);
router.delete('/user/cart/product/:productId', authCheck, removeProductCart);
router.put(
  '/user/cart/product/:productId',
  authCheck,
  updateProductCartQuantity,
);
router.post('/user/address', authCheck, saveUserAddress); // save user address on Checkout page
router.get('/user/address', authCheck, getUserAddress); // get user address on Checkout page
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart); // apply coupon to cart

// User order routes
router.post('/user/orders', authCheck, createOrder);
router.post('/user/cash-orders', authCheck, createOrderCashPayment);
router.get('/user/orders', authCheck, getAllOrdersByUser);

// User wishlist routes
router.post('/user/whishlist', authCheck, addToWishlist);
router.get('/user/whishlist', authCheck, getWishlist);
router.put('/user/whishlist', authCheck, updateWishlist);

export default router;

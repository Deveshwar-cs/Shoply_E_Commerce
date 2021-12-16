const express = require('express');

// middlewares
const { authCheck } = require('../middlewares/authMiddleware');

// controllers
const userController = require('../controllers/userController');

const router = express.Router();

// User cart routes
router.post('/user/cart', authCheck, userController.createCart); // save cart by user in DB
router.get('/user/cart', authCheck, userController.getUserCart);
router.delete('/user/cart', authCheck, userController.emptyUserCart);
router.post('/user/address', authCheck, userController.saveUserAddress); // save user address on Checkout page
router.get('/user/address', authCheck, userController.getUserAddress); // get user address on Checkout page
router.post(
  '/user/cart/coupon',
  authCheck,
  userController.applyCouponToUserCart
); // apply coupon to cart

// User order routes
router.post('/user/orders', authCheck, userController.createOrder);
router.get('/user/orders', authCheck, userController.getAllOrdersByUser);

module.exports = router;

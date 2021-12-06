const express = require('express');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const couponController = require('../controllers/couponController');

const router = express.Router();

router.post('/coupons', authCheck, adminCheck, couponController.createCoupon); // create coupon
router.get('/coupons', authCheck, adminCheck, couponController.getAllCoupons); // get all coupons list
router.delete(
  '/coupons/:couponId',
  authCheck,
  adminCheck,
  couponController.deleteCoupon
); // delete coupon

module.exports = router;

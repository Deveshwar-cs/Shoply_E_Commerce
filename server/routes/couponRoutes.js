import express from 'express';
// middlewares
import { authCheck, adminCheck } from '../middlewares/authMiddleware.js';

// controllers
import {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} from '..//controllers/couponController.js';

const router = express.Router();

router.post('/coupons', authCheck, adminCheck, createCoupon); // create coupon
router.get('/coupons', authCheck, adminCheck, getAllCoupons); // get all coupons list
router.delete('/coupons/:couponId', authCheck, adminCheck, deleteCoupon); // delete coupon

export default router;

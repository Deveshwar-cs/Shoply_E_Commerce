// import slugify from slugify;
import { ObjectId } from 'bson';

import Coupon from '../models/couponModel.js';
import User from '../models/userModel.js';

export const createCoupon = async (req, res) => {
  const { name, expiry, discount } = req.body.coupon;

  try {
    const newCoupon = await Coupon.create({ name, expiry, discount });

    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

export const getAllCoupons = async (req, res) => {
  try {
    const allCoupons = await Coupon.find({}).sort([['createdAt', 'desc']]);

    res.status(201).json(allCoupons);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.couponId);

    res.status(204).json(deletedCoupon);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

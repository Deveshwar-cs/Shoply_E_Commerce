const slugify = require('slugify');
const ObjectId = require('bson').ObjectId;

const Coupon = require('../models/couponModel');
const User = require('../models/userModel');

exports.createCoupon = async (req, res) => {
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

exports.getAllCoupons = async (req, res) => {
  try {
    const allCoupons = await Coupon.find({}).sort([['createdAt', 'desc']]);

    res.status(201).json(allCoupons);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.couponId);

    res.status(204).json(deletedCoupon);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

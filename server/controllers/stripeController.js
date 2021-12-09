const Product = require('../models/productModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

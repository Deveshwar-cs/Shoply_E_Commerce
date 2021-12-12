const Product = require('../models/productModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  try {
    // 1. Find current user
    const user = await User.findOne({ email: req.user.email });
    // 2. Get user's cart
    const cart = await Cart.findOne({ orderedBy: user._id });

    console.log('createPaymentIntent CART totalPrice ===>', cart.totalPrice);

    // 3. Create payment intent with order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cart.totalPrice * 100,
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

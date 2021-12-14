const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  try {
    // 1. Find current user
    const user = await User.findOne({ email: req.user.email });
    // 2. Get user's cart
    const cart = await Cart.findOne({ orderedBy: user._id });

    // 3. Create payment intent with order amount and currency
    // Cart model only has totalPriceAfterDiscount if coupon was applied – if totalPriceAfterDiscount exist we want to charge totalPriceAfterDiscount, else totalPrice
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cart.totalPriceAfterDiscount
        ? cart.totalPriceAfterDiscount * 100
        : cart.totalPrice * 100,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

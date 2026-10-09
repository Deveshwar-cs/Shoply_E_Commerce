import User from '../models/userModel.js';
import Cart from '../models/cartModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createPaymentIntent = async (req, res) => {
  try {
    // 1. Find current user
    const user = await User.findOne({
      email: req.user.email,
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // 2. Get user's cart
    const cart = await Cart.findOne({
      orderedBy: user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    // 3. Decide which amount to charge
    const amount = cart.totalPriceAfterDiscount
      ? cart.totalPriceAfterDiscount
      : cart.totalPrice;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: 'Cart total must be greater than 0',
      });
    }

    // 4. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    });

    // 5. Send client secret to frontend
    return res.status(200).json({
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe payment intent error:', error);

    return res.status(500).json({
      message: 'Failed to create payment intent',
      error: error.message,
    });
  }
};

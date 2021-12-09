const express = require('express');

// middlewares
const { authCheck } = require('../middlewares/authMiddleware');

// controllers
const stripeController = require('../controllers/stripeController');

const router = express.Router();

router.post(
  '/create-payment-intent',
  authCheck,
  stripeController.createPaymentIntent
);

module.exports = router;

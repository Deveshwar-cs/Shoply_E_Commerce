import express from 'express';
// middlewares
import { authCheck } from '../middlewares/authMiddleware.js';

// controllers
import { createPaymentIntent } from '../controllers/stripeController.js';

const router = express.Router();

router.post('/create-payment-intent', authCheck, createPaymentIntent);

export default router;

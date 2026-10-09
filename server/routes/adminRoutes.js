import express from 'express';
// middlewares
import { authCheck, adminCheck } from '../middlewares/authMiddleware.js';

// controllers
import {
  getAllOrdersByAdmin,
  updateOrderStatus,
} from '../controllers/adminController.js';
const router = express.Router();

// Admin order routes
router.get('/admin/orders', authCheck, adminCheck, getAllOrdersByAdmin);
router.put('/admin/order-status', authCheck, adminCheck, updateOrderStatus);

export default router;

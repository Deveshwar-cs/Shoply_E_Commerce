import express from 'express';

// controllers
import {
  createOrUpdateUser,
  currentUser,
} from '../controllers/authController.js';

// middlewares
import { authCheck, adminCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-or-update-user', authCheck, createOrUpdateUser);

router.post('/current-user', authCheck, currentUser);

// router.post('/current-admin', authCheck, adminCheck, currentUser);

export default router;

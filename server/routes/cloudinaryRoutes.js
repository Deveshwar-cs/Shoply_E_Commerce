import express from 'express';
// middlewares
import { authCheck, adminCheck } from '../middlewares/authMiddleware.js';

// controllers
import {
  uploadImages,
  deleteImage,
} from '../controllers/cloudinaryController.js';

const router = express.Router();

router.post('/images', authCheck, adminCheck, uploadImages);

router.delete('/images', authCheck, adminCheck, deleteImage);

export default router;

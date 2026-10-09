import express from 'express';
// middlewares
import { authCheck, adminCheck } from '../middlewares/authMiddleware.js';
// controllers
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllSubcategoriesByCategory,
  getAllCategories,
  getCategory,
} from '../controllers/categoryController.js';
const router = express.Router();

router.get('/categories', getAllCategories);
router.get('/categories/:slug', getCategory);

router.post('/categories', authCheck, adminCheck, createCategory);
router.put('/categories/:slug', authCheck, adminCheck, updateCategory);
router.delete('/categories/:slug', authCheck, adminCheck, deleteCategory);
// Get all subcategories by parent category
router.get('/categories/subcategories/:_id', getAllSubcategoriesByCategory);

export default router;

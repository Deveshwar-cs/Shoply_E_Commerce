import express from 'express';
// middlewares
import { authCheck, adminCheck } from '../middlewares/authMiddleware.js';
import {
  getAllSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from '../controllers/subCategoryController.js';

// controllers

const router = express.Router();

router.get('/subcategories', getAllSubCategories);
router.get('/subcategories/:slug', getSubCategory);

router.post('/subcategories', authCheck, adminCheck, createSubCategory);
router.put('/subcategories/:slug', authCheck, adminCheck, updateSubCategory);
router.delete('/subcategories/:slug', authCheck, adminCheck, deleteSubCategory);

export default router;

const express = require('express');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:slug', categoryController.getCategory);

router.post(
  '/categories',
  authCheck,
  adminCheck,
  categoryController.createCategory
);
router.put(
  '/categories/:slug',
  authCheck,
  adminCheck,
  categoryController.updateCategory
);
router.delete(
  '/categories/:slug',
  authCheck,
  adminCheck,
  categoryController.deleteCategory
);
// Get all subcategories by parent category
router.get(
  '/categories/subcategories/:_id',
  categoryController.getAllSubcategoriesByCategory
);

module.exports = router;

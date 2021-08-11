const express = require('express');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', categoryController.getAllCategories);
router.post(
  '/category',
  authCheck,
  adminCheck,
  categoryController.createCategory
);
router.get(
  '/category/:slug',
  authCheck,
  adminCheck,
  categoryController.getCategory
);
router.patch(
  '/category/:slug',
  authCheck,
  adminCheck,
  categoryController.updateCategory
);
router.delete(
  '/category/:slug',
  authCheck,
  adminCheck,
  categoryController.deleteCategory
);

module.exports = router;

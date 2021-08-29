const express = require('express');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const subCategoryController = require('../controllers/subCategoryController');

const router = express.Router();

router.get('/subcategories', subCategoryController.getAllSubCategories);
router.get('/subcategories/:slug', subCategoryController.getSubCategory);

router.post(
  '/subcategories',
  authCheck,
  adminCheck,
  subCategoryController.createSubCategory
);
router.put(
  '/subcategories/:slug',
  authCheck,
  adminCheck,
  subCategoryController.updateSubCategory
);
router.delete(
  '/subcategories/:slug',
  authCheck,
  adminCheck,
  subCategoryController.deleteSubCategory
);

module.exports = router;

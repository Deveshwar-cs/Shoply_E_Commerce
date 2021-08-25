const express = require('express');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const subCategoryController = require('../controllers/subCategoryController');

const router = express.Router();

router.get('/subcategories', subCategoryController.getAllSubCategories);
router.get('/subcategories/:slug', subCategoryController.getSubCategory);

// protected routes after this line
router.use(authCheck, adminCheck);

router.post('/subcategories', subCategoryController.createSubCategory);
router.put('/subcategories/:slug', subCategoryController.updateSubCategory);
router.delete('/subcategories/:slug', subCategoryController.deleteSubCategory);

module.exports = router;

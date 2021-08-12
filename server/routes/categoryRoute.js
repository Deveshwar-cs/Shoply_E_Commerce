const express = require('express');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:slug', categoryController.getCategory);

// protected routes after this line
router.use(authCheck, adminCheck);

router.post('/categories', categoryController.createCategory);
router.patch('/categories/:slug', categoryController.updateCategory);
router.delete('/categories/:slug', categoryController.deleteCategory);

module.exports = router;

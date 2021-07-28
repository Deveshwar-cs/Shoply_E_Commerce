const express = require('express');

// controllers
const authController = require('../controllers/authController');

// middlewares
const { authCheck } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/create-or-update-user',
  authCheck,
  authController.createOrUpdateUser
);
router.post('/current-user', authCheck, authController.currentUser);

module.exports = router;

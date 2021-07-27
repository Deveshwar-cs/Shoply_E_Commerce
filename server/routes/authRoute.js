const express = require('express');

// controllers
const auth = require('../controllers/authController');

// middlewares
const { authCheck } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-or-update-user', authCheck, auth.createOrUpdateUser);

module.exports = router;

const express = require('express');

// controllers
const auth = require('../controllers/auth');

// middlewares
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.get('/create-or-update-user', authCheck, auth.createOrUpdateUser);

module.exports = router;

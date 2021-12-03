const express = require('express');

// middlewares
const { authCheck } = require('../middlewares/authMiddleware');

// controllers
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/user/cart', authCheck, userController.createCart); // save cart by user in DB
router.get('/user/cart', authCheck, userController.getUserCart);

// router.get('/user', (req, res) => {
//   res.json({
//     data: 'Hey, you hit user API endpoint',
//   });
// });

module.exports = router;

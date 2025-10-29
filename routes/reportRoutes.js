const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { isLoggedIn } = require('../middleware/authMiddleware');

router.use(isLoggedIn);

router.get('/defaulters', reportController.getDefaultersList);

module.exports = router;
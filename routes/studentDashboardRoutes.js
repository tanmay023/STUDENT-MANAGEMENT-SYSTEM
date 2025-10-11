const express = require('express');
const router = express.Router();
const studentDashboardController = require('../controllers/studentDashboardController');
const {isStudentLoggedIn} = require('../middleware/authMiddleware');

router.use(isStudentLoggedIn);
router.get('/dashboard',studentDashboardController.getDashboard);
module.exports = router;
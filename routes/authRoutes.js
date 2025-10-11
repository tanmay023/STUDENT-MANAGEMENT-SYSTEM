const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.getHomePage);

router.get('/login', authController.getLoginPage);
router.post('/login', authController.loginUser);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.registerUser);
router.get('/logout', authController.logoutUser);

router.get('/student/login', authController.getStudentLoginPage);
router.post('/student/login', authController.loginStudent);
router.get('/student/logout', authController.logoutStudent);
router.get('/student/register', authController.getStudentRegisterPage);
router.post('/student/register', authController.registerStudent);
module.exports = router;
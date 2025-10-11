const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {isLoggedIn} = require('../middleware/authMiddleware');

router.get('/new',studentController.getStudentForm);
router.get('/',studentController.getAllStudents);
router.post('/',studentController.createStudent);
router.post('/delete/:id',studentController.deleteStudent);
router.get('/edit/:id',studentController.getEditForm);

router.post('/update/:id',studentController.updateStudent);
module.exports = router;
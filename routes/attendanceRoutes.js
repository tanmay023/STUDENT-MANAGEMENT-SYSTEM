const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/',attendanceController.getAttendancePage);
router.post('/',attendanceController.getStudentsForAttendance);
router.post('/save',attendanceController.saveAttendance);
router.get('/report',attendanceController.getAttendanceReportPage);
router.post('/report',attendanceController.showAttendanceReport);
module.exports = router;
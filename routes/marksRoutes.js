const express = require('express');
const router = express.Router();
const marksController = require('../controllers/marksController');

router.get('/',marksController.getMarksEntryPage);
router.post('/',marksController.getStudentsForMarks);
router.post('/save',marksController.saveMarks);
router.get('/report',marksController.getMarksReportPage);
router.post('/report',marksController.showMarksReport);
module.exports = router;
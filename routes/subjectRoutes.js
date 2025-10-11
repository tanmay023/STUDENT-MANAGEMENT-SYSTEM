const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.get('/new',subjectController.getSubjectForm);
router.get('/',subjectController.getAllSubjects);
router.post('/',subjectController.createSubject);
router.post('/delete/:id',subjectController.deleteSubject);
router.get('/edit/:id',subjectController.getEitForm);
router.post('/update/:id',subjectController.updateSubject);
module.exports = router;
const Subject = require('../models/subject');
const Student = require('../models/student');
const Marks = require('../models/marks');

exports.getMarksEntryPage = async (req, res) => {
    try {
        const subjects = await Subject.find({});
        res.render('marks/index', {
            title: "Enter Marks",
            subjects: subjects
        });
    } catch (error) {
        console.error("Error fetching subjects for marks entry:", error);
        res.status(500).send("An error occurred while fetching subjects.");
    }
};

exports.getStudentsForMarks = async (req, res) => {
    try{
        const { subjectId,examType,totalMarks } = req.body;
        const subject = await Subject.findById(subjectId);
        if(!subject){
            return res.status(404).send("Subject not found.");
        }

        const students = await Student.find({ semester: subject.semester});

        res.render('marks/enter', {
            title: "Enter Marks",
            students: students,
            subject: subject,
            examType: examType,
            totalMarks: totalMarks
        });
    } catch (error) {
        console.error("Error fetching students for marks entry:", error);
        res.status(500).send("An error occurred while fetching students.");
    }
}

exports.saveMarks = async (req, res) => {
    try {
        const { subjectId, examType, totalMarks, marks } = req.body;

        const marksPromises = [];

        for (const studentId in marks) {
            const marksObtained = marks[studentId];

            const promise = Marks.updateOne(
                { studentId, subjectId, examType },
                { $set: { marksObtained, totalMarks } },
                { upsert: true }
            );
            marksPromises.push(promise);
        }
        await Promise.all(marksPromises);
        res.redirect('/marks');
    }
    catch (error) {
        console.error("Error saving marks:", error);
        res.status(500).send("An error occurred while saving marks.");
    }
};

exports.getMarksReportPage = async (req, res) => {
    try{
        const subjects = await Subject.find({});
        res.render('marks/report_form', {
            title:" View Marks Report",
            subjects: subjects
        });
    } catch (error) {
        console.error("Error fetching subjects for marks report:", error);
        res.status(500).send("An error occurred while fetching subjects.");
    }
};

exports.showMarksReport = async (req, res) => {
    try {
        const { subjectId } = req.body;

        const records = await Marks.find({ subjectId: subjectId }).populate('studentId');
        const subject = await Subject.findById(subjectId);

        const validRecords = records.filter(record => record.studentId !== null);

        const marksByExam = {};
        validRecords.forEach(record => {
            if (!marksByExam[record.examType]) {
                marksByExam[record.examType] = [];
            }
            marksByExam[record.examType].push(record);
        });

        res.render('marks/report', {
            title: 'Marks Report',
            subject: subject,
            marksByExam: marksByExam
        });
    } catch (error) {
        console.error("Error showing marks report:", error);
        res.status(500).send('Server Error');
    }
};

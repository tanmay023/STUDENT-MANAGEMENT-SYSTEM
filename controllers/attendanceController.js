const Student = require('../models/student');
const Attendance = require('../models/attendance');
const Subject = require('../models/subject');

exports.getAttendancePage = async (req, res) => {
    try {
        const subjects = await Subject.find({});
        res.render('attendance/index', {
            title:" Mark Attendance",
            subjects: subjects
        });
    } catch (error) {
        console.error("Error fetching subjects for attendance:", error);
        res.status(500).send("An error occurred while fetching subjects.");
    }
};

exports.getStudentsForAttendance = async (req, res) => {
    try {
        const { subjectId, date } = req.body;
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).send("Subject not found.");
        }

        const students = await Student.find({ semester: subject.semester});
        res.render('attendance/take', {
            title: "Mark Attendance",
            students: students,
            subject: subject,
            date: date
        });
    } catch (error) {
        console.error("Error fetching students for attendance:", error);
        res.status(500).send("An error occurred while fetching students.");
    }
};

exports.saveAttendance = async (req, res) => {
    try {
        const { subjectId, date, attendance } = req.body;
        const attendancePromises = [];

        for (const studentId in attendance) {
            const status = attendance[studentId];

            const promise = Attendance.updateOne(
                { studentId: studentId, subjectId: subjectId, date: date },
                { $set: { status: status } },
                { upsert: true }
            );
            attendancePromises.push(promise);
        }
        await Promise.all(attendancePromises);
        res.redirect('/attendance');
    } catch (error) {
        console.error("Error saving attendance:", error);
        res.status(500).send("An error occurred while saving attendance.");
    }
};

exports.getAttendanceReportPage = async (req, res) => {
    try{
        const subjects = await Subject.find({});
        res.render('attendance/report_form', {
            title: "Attendance Report",
            subjects: subjects
        });
    }catch(error){
        console.error("Error fetching subjects for attendance report:", error);
        res.status(500).send("An error occurred while fetching subjects.");
    }
};

exports.showAttendanceReport = async (req, res) => {
    try{
        const { subjectId,date } = req.body;
        const records = await Attendance.find({ subjectId: subjectId, date: date }).populate('studentId')

        const subject = await Subject.findById(subjectId);

        res.render('attendance/report', {
            title: "Attendance Report",
            records: records,
            subject: subject,
            date: date
        });
    }catch(error){
        console.error("Error fetching attendance report:", error);
        res.status(500).send("An error occurred while fetching the attendance report.");
    }
};
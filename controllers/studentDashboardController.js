const Student = require('../models/student');
const Attendance = require('../models/attendance');
const Marks = require('../models/marks');

exports.getDashboard = async (req, res) => {
    try {
        const studentId = req.session.studentId;
        const student = await Student.findById(studentId);
        const attendanceRecords = await Attendance.find({ studentId: studentId }).populate('subjectId');
        const marksRecords = await Marks.find({ studentId: studentId }).populate('subjectId');

        if (!student) {
            return res.redirect('/student/login');
        }

        const attendanceBySubject = {};
        attendanceRecords.forEach(record => {
            const subjectName = record.subjectId.name;
            if (!attendanceBySubject[subjectName]) {
                attendanceBySubject[subjectName] = { total: 0, present: 0 };
            }
            attendanceBySubject[subjectName].total++;
            if (record.status === 'Present') {
                attendanceBySubject[subjectName].present++;
            }
        });

        for (const subjectName in attendanceBySubject) {
            const { total, present } = attendanceBySubject[subjectName];
            attendanceBySubject[subjectName].percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
        }

        res.render('students/dashboard', {
            title: 'My Dashboard',
            student: student,
            attendanceSummary: attendanceBySubject,
            marks: marksRecords
        });

    } catch (error) {
        console.error("Error fetching student dashboard data:", error);
        res.status(500).send("An error occurred.");
    }
};

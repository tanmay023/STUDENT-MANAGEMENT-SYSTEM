const Attendance = require('../models/attendance');

exports.getDefaultersList = async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: { student: "$studentId", subject: "$subjectId" },
                    totalClasses: { $sum: 1 },
                    presentClasses: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Present"] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$_id.student",
                    subjectId: "$_id.subject",
                    totalClasses: 1,
                    presentClasses: 1,
                    percentage: {
                        $multiply: [{ $divide: ["$presentClasses", "$totalClasses"] }, 100]
                    }
                }
            },
            {
                $match: {
                    percentage: { $lt: 75 }
                }
            },
            {
                $lookup: {
                    from: "students",
                    localField: "studentId",
                    foreignField: "_id",
                    as: "studentDetails"
                }
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "subjectId",
                    foreignField: "_id",
                    as: "subjectDetails"
                }
            },
            { $unwind: "$studentDetails" },
            { $unwind: "$subjectDetails" },
            {
                $sort: { "studentDetails.rollNumber": 1, "subjectDetails.name": 1 }
            }
        ];

        const defaulters = await Attendance.aggregate(pipeline);

        res.render('reports/defaulters', {
            title: 'Attendance Defaulters List',
            defaulters: defaulters
        });

    } catch (error) {
        console.error("Error generating defaulters list:", error);
        res.status(500).send("An error occurred while generating the report.");
    }
};

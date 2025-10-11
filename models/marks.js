const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    subjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    examType:{
        type: String,
        enum: ['Insem', 'Endsem', 'CIE I','CIE II','CIE III'],
    },
    marksObtained:{
        type: Number,
        required: true
    },
    totalMarks:{
        type: Number,
        required: true
    }
});

const Marks = mongoose.model('Marks', marksSchema);
module.exports = Marks;
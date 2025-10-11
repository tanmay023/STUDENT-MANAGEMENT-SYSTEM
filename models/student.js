const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    semester: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    }
});

studentSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
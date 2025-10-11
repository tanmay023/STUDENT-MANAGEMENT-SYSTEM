const Admin = require('../models/admin');
const Student = require('../models/student');
const bcrypt = require('bcryptjs');


exports.getHomePage = (req, res) => {
    res.render('index', { title: "Home" });
};

exports.getLoginPage = (req, res) => {
    res.render('auth/login', { title: "Login" });
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            req.flash('error_msg', 'No admin found with that email.');
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            req.flash('error_msg', 'Password incorrect.');
            return res.redirect('/login');
        }

        req.session.adminId = admin._id;
        req.flash('success_msg', 'You are now logged in!');
        res.redirect('/');
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send("An error occurred while logging in the user.");
    }
};

exports.getRegisterPage = (req, res) => {
    res.render('auth/register', { title: "Register" });
};

exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newAdmin = new Admin({ email, password });
        await newAdmin.save();
        req.flash('success_msg', 'Registration successful! Please log in.');
        res.redirect('/login');
    } catch (error) {
        req.flash('error_msg', 'Something went wrong. That email might already be in use.');
        res.redirect('/register');
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out user:", err);
            return res.status(500).send("An error occurred while logging out.");
        }
        res.redirect('/login');
    });
};

exports.getStudentLoginPage = (req, res) => {
     res.render('auth/student_login', { title: "Student Login" });
};

exports.loginStudent = async (req, res) => {
    try {
        const { rollNumber, password } = req.body;
        const student = await Student.findOne({ rollNumber: rollNumber });
        if (!student) {
            req.flash('error_msg', 'No student found with that roll number.');
            return res.redirect('/student/login');
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            req.flash('error_msg', 'Password incorrect.');
            return res.redirect('/student/login');
        }

        req.session.studentId = student._id;
        res.redirect('/student/dashboard');
    } catch (error) {
        console.error("Error logging in student:", error);
        res.status(500).send("An error occurred while logging in the student.");
    }
};

exports.logoutStudent = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out student:", err);
            return res.status(500).send("An error occurred while logging out.");
        }
        res.redirect('/student/login');
    });
};

exports.getStudentRegisterPage = (req, res) => {
    res.render('auth/student_register', { title: "Student Register" });
};

exports.registerStudent = async (req, res) => {
    try {
        const {name,rollNumber,password,semester,email,department} = req.body;
        const existingStudent = await Student.findOne({ $or: [{ rollNumber }, { email }] });
        
        if (existingStudent) {
            req.flash('error_msg', 'A student with that Roll Number or Email already exists.');
            return res.redirect('/student/register');
        }

        const newStudent = new Student({
            name,
            rollNumber,
            password,
            semester,
            email,
            department
        });

        await newStudent.save();
        req.flash('success_msg', 'Registration successful! You can now log in.');
        res.redirect('/student/login');

    } catch (error) {
        console.error('Student Registration Error:', error);
        req.flash('error_msg', 'Something went wrong. Please try again.');
        res.redirect('/student/register');
    }   
}
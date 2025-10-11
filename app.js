const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
require('dotenv').config();

const app = express();
const mongo_url = process.env.MONGODB_URI;

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

async function main() {
    await mongoose.connect(mongo_url);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongo_url })
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.adminId = req.session.adminId;
    res.locals.studentId = req.session.studentId;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const marksRoutes = require('./routes/marksRoutes');
const authRoutes = require('./routes/authRoutes');
const studentDashboardRoutes = require('./routes/studentDashboardRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/students', studentRoutes);
app.use('/subjects', subjectRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/marks', marksRoutes);
app.use('/reports', reportRoutes);
app.use('/student', studentDashboardRoutes);
app.use('/', authRoutes);

app.listen(8080, () => {
    console.log("Server started on port 8080");
});

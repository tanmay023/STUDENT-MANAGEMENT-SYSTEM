exports.isLoggedIn = (req, res, next) => {
    if (req.session.adminId) {
        next();
    } else {
        res.redirect('/login');
    }
}

exports.isStudentLoggedIn = (req, res, next) => {
    if (req.session.studentId) {
        next();
    } else {
        res.redirect('/student/login');
    }
}
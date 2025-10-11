const Student = require('../models/student');

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.render('students/index', {
            students: students,
            title: "All Students"
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).send("An error occurred while fetching students.");
    }
};

exports.getNewStudentForm = (req, res) => {
    res.render('students/new', { title: "Add New Student" });
}

exports.createStudent = async (req, res) => {
    try {
        console.log(req.body);
        const { name, rollNumber, email, password,semester, department } = req.body;

        const newStudent = new Student({
            name,
            rollNumber,
            email,
            password,
            semester,
            department
        });

        await newStudent.save();
        res.redirect('/students');
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).send("An error occurred while creating the student.");
    }
};

exports.getStudentForm = (req,res) =>{
    res.render('students/new',{title: "Add New Student"});
}

exports.deleteStudent = async (req,res) =>{
    try{
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/students');
    }catch(error){
        console.error("Error deleting student:", error);
        res.status(500).send("An error occurred while deleting the student.");
    }
};

exports.getEditForm = async (req,res) =>{
    try{
        const student = await Student.findById(req.params.id);

        if(!student){
            return res.status(404).send("Student not found");
        }
        res.render('students/edit',{title: "Edit Student",student: student});
    }catch(error){
        console.error("Error fetching student for edit:", error);
        res.status(500).send("An error occurred while fetching the student.");
    }
};

exports.updateStudent = async (req,res) =>{
    try{
        const studentId = req.params.id;
        const updateddata = req.body;

        await Student.findByIdAndUpdate(studentId, updateddata);
        res.redirect('/students');
    }catch(error){
        console.error("Error updating student:", error);
        res.status(500).send("An error occurred while updating the student.");
    }
};
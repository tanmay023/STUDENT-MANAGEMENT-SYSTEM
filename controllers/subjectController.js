const Subject = require('../models/subject');

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({});
        res.render('subjects/index', {
            subjects: subjects,
            title: "All Subjects"
        });
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).send("An error occurred while fetching subjects.");
    }
};

exports.getSubjectForm = (req, res) => {
    res.render('subjects/new', { title: "Add New Subject" });
};

exports.createSubject = async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        await newSubject.save();
        res.redirect('/subjects');
    } catch (error) {
        console.error("Error creating subject:", error);
        res.status(500).send("An error occurred while creating the subject.");
    }
};

exports.getEitForm = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        res.render('subjects/edit', { subject: subject, title: "Edit Subject" });
    } catch (error) {
        console.error("Error fetching subject for edit:", error);
        res.status(500).send("An error occurred while fetching the subject.");
    }
};

exports.updateSubject = async (req, res) => {
    try {
        await Subject.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/subjects');
    } catch (error) {
        console.error("Error updating subject:", error);
        res.status(500).send("An error occurred while updating the subject.");
    }
};

exports.deleteSubject = async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);
        res.redirect('/subjects');
    } catch (error) {
        console.error("Error deleting subject:", error);
        res.status(500).send("An error occurred while deleting the subject.");
    }
};


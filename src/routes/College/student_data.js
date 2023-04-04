const router = require('express').Router();
const mongoose = require('mongoose');
const Student = require('../../models/student_model');
const Resume = require('../../models/resume_model');

var data = []
router.get('/:id', async(req, res) => {

    const student = await Student.findOne({ _id:req.params.id});
    const resume = await Resume.findOne({ _id:req.params.id});
    data.push(student);
    data.push(resume);
    res.json(data);
});

module.exports = router;
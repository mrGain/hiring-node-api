const router = require('express').Router();
const mongoose = require('mongoose');
const verify = require('../../utils/User/verifyToken');
const Jobs = require('../../models/jobs_model');
const Student = require('../../models/student_model');
const Resume = require('../../models/resume_model');




// Clculate eligiblity

const calculateEligibility = (student,resume, job) => {
    // console.log(student, job);
    // console.log(student);
    // console.log(resume);
    // console.log(typeof(job._doc.eligibility.GPA));
    let gpaEligebility = false;
    let backlogEligibility = false;
    let class10Eligibility = false;
    let class12Eligibility = false;
    let branchEligibility = false;
    let Eligibility = {}
    if (Number(student.cgpa) >= Number(job._doc.eligibility.GPA)) {
        gpaEligebility = true;
        Eligibility.gpa = "GPA is eligible";

    }else{
        Eligibility.gpa = "GPA is less than "+job._doc.eligibility.GPA;
    }
    if (resume.backlogs <= job._doc.eligibility.backlogs) {
        backlogEligibility = true;
        Eligibility.backlogs = "Backlogs are eligible";
    }else{
        Eligibility.backlogs = "Backlogs are more than "+job._doc.eligibility.backlogs;
    }
    if (resume.schoolpercentage >= job._doc.eligibility.class10) {
        class10Eligibility = true;
        Eligibility.class10 = "Class 10 is eligible";
    }else{
        Eligibility.class10 = "Class 10 is less than "+job._doc.eligibility.class10;
    }
    if (resume.school12percentage >= job._doc.eligibility.class12) {
        class12Eligibility = true;
        Eligibility.class12 = "Class 12 is eligible";
    }else{
        Eligibility.class12 = "Class 12 is less than "+job._doc.eligibility.class12;
    }
    if (job._doc.eligibility.branch.includes(resume.branch)) {
        branchEligibility = true;
        Eligibility.branch = "Branch is eligible";
    }else{
        Eligibility.branch = "Branch is not eligible";
    }
    if (gpaEligebility && backlogEligibility && class10Eligibility && class12Eligibility && branchEligibility) {
        Eligibility.status = "Eligible";
    }else{
        Eligibility.status = "Not Eligible";
    }

    return Eligibility;

}

// Get all Jobs for Student
router.get('/',verify, async(req, res) => {
    const cid= await Student.findOne({_id: req.user._id},{collegeID:1,jobs:1,cgpa:1,_id:0});

    const resume = await Resume.findOne({_id: req.user._id}, "branch backlogs schoolpercentage school12percentage");
    const jobs = await Jobs.find({collegeID: cid._doc.collegeID},"jobName post location type ctcStipend eligibility");
    
    for(var i=0;i<cid._doc.jobs.length;i++){
        let studentjob = cid._doc.jobs[i];
        const jid=studentjob.jobID;
        for(var j=0;j<jobs.length;j++){
            if(jobs[j]._doc._id.toString()==jid.toString()){
                jobs[j]._doc.status = studentjob.status;
            }
        }

    }
    for(var i=0;i<jobs.length;i++){
        if(!jobs[i]._doc.status){
            jobs[i]._doc.status = calculateEligibility(cid._doc,resume._doc, jobs[i]).status;
        }
    
    }
    res.json(jobs);
});

// Get a Single Job for Student
router.get('/:id',verify, async(req, res) => {
    const cid= await Student.findOne({_id: req.user._id},{collegeID:1,jobs:1,cgpa:1,_id:0});
    const resume = await Resume.findOne({_id: req.user._id}, "branch backlogs schoolpercentage school12percentage");
    const jobs = await Jobs.findById(req.params.id);
    const jid=jobs._doc._id;
    jobs._doc.ElegibilityStatus = calculateEligibility(cid._doc,resume._doc, jobs);
    if(!jobs._doc.status){
        jobs._doc.status = jobs._doc.ElegibilityStatus.status;
    }
    res.json(jobs);
} );

// Apply for a Job
router.post('/apply/:jobID',verify, async(req, res) => {
    const cid= await Student.findById(req.user._id,{collegeID:1,jobs:1,cgpa:1,_id:1});
    const resume = await Resume.findById(req.user._id, "branch backlogs schoolpercentage school12percentage");
    const jobs = await Jobs.findById(req.params.jobID, {events: 0});
    const jid=jobs._doc._id;
    jobs._doc.ElegibilityStatus = calculateEligibility(cid._doc,resume._doc, jobs);
    if(!jobs._doc.status){
        jobs._doc.status = jobs._doc.ElegibilityStatus.status;
    }
    if(jobs._doc.status=="Eligible"){
        const studentjob = {
            jobID: jid,
            status: "Applied"
        }
        cid._doc.jobs.push(studentjob);
        await cid.save();
        res.json(cid);
    }else{
        res.json(jobs);
    }
} );


module.exports = {
    router,
    calculateEligibility
}    



const router = require('express').Router();
const mongoose = require('mongoose');
const verify = require('../../utils/User/verifyToken');
const Jobs = require('../../models/jobs_model');
const Student = require('../../models/student_model');
const College = require('../../models/college_model');
const Resume = require('../../models/resume_model');
const calculateEligibility = require('./student_jobs').calculateEligibility;

var dashboardData = {
    companiesMatchingProfile: 0,
    companiesAppliedIn: 20,
    currentlyInProgress: 15,
    trendingJobsNational: [
        {
            name: 'Product Management',
            count: 6575,
        },
        {
            name: 'Full Stack Developer',
            count: 9805,
        },
    ],
    highSkillStats: [
        {
            name: 'JavaScript',
            count: 1380,
        },
        {
            name: 'Flutter',
            count: 1200,
        },
    ],
}

router.get('/', verify, async(req, res) => {
    const student = await Student.findOne({_id: req.user._id},{collegeID:1,jobs:1,cgpa:1,_id:0});
    // console.log(student._doc.collegeID);
    const college = await College.findById(student._doc.collegeID,{_id:0,placementStatsYear:1, placementStatsBranch:1, trendingJobsCollege:1});
    
    const jobs = await Jobs.find({collegeID: student._doc.collegeID},"jobName post location type ctcStipend eligibility");

    const resume = await Resume.findById(req.user._id, "branch backlogs schoolpercentage school12percentage");
    // console.log(college);
    for(var i=0;i<jobs.length;i++){
        if(!jobs[i]._doc.status){
            jobs[i]._doc.status = calculateEligibility(student._doc,resume._doc, jobs[i]).status;
        }

        if(jobs[i]._doc.status=="Eligible"){
            dashboardData.companiesMatchingProfile += 1;
    
        }
    }    
    dashboardData.companiesVisited = jobs.length;
    dashboardData = {
        ...dashboardData,
        ...college._doc,
    }

    res.json(dashboardData);
} );

module.exports = router;
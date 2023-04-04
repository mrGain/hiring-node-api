const mongoose = require('mongoose');
const router = require('express').Router();
const Resume = require('../../models/resume_model');
const verify = require('../../utils/User/verifyToken');
const { uploadFile } = require('../../utils/s3');
const { upload } = require('../../utils/s3');
const multer = require('multer');

router.get('/',verify, async(req, res) => {
    const resume = await Resume.find({userID: req.user._id});
    res.status(200).json(resume);
})


// Post a new resume
router.post('/new/university',upload.single('file'),verify, async(req, res) => {
    const fileUploded = await uploadFile(req.file);
    const { Location } = fileUploded;

    const resume = new Resume({
        _id: req.user._id,
        university: req.body.university,
        universitySheetURL: Location,
        program: req.body.program,
        branch: req.body.branch,
        batch: req.body.batch,
        rollno: req.body.rollno,
        sem1: req.body.sem1,
        sem2: req.body.sem2,
        sem3: req.body.sem3,
        sem4: req.body.sem4,
        sem5: req.body.sem5,
        sem6: req.body.sem6,
        sem7: req.body.sem7,
        sem8: req.body.sem8,
        backlogs: req.body.backlogs,
        highlights: req.body.highlights
    });
    try{    
        await resume.save()
        res.status(200).send(resume);
    }
    catch(err){
        console.log(err);
    }
});

// 12th School details
router.post('/new/college',upload.single('file'),verify, async(req, res) => {
    const fileUploded = await uploadFile(req.file);
    const { fileName } = fileUploded;

    const resume = new Resume({
        school12SheetURL: fileName,
        school12: req.body.school12,
        school12Stream: req.body.school12Stream,
        school12Board: req.body.school12Board,
        school12Branch: req.body.school12Branch,
        school12percentage: req.body.school12percentage,
        school12EducationType: req.body.school12EducationType,
        school12DurationStart: req.body.school12DurationStart,
        school12DurationEnd: req.body.school12DurationEnd,
        school12Highlights: req.body.school12Highlights
    });
    try{    
        await resume.save()
        res.status(200).send(resume);
    }
    catch(err){
        console.log(err);
    }
});

//  10th School details
router.post('/new/school',upload.single('file'),verify, async(req, res) => {
    const fileUploded = await uploadFile(req.file);
    const { fileName } = fileUploded;

    const resume = new Resume({
        schoolSheetURL: fileName,
        school: req.body.school,
        schoolStream: req.body.schoolStream,
        schoolBoard: req.body.schoolBoard,
        schoolBranch: req.body.schoolBranch,
        schoolpercentage: req.body.schoolpercentage,
        schoolEducationType: req.body.schoolEducationType,
        schoolDurationStart: req.body.schoolDurationStart,
        schoolDurationEnd: req.body.schoolDurationEnd,
        schoolHighlights: req.body.schoolHighlights
    });
    try{    
        await resume.save()
        res.status(200).send(resume);
    }
    catch(err){
        console.log(err);
    }
});

// Skills and projects
router.post('/new/skills',verify, async(req, res) => {
    const resume = new Resume({    
        skills: req.body.skills,
        projects: req.body.projects,
    });

    try{    
        await resume.save()
        res.status(200).send(resume);
    }
    catch(err){
        console.log(err);
    }
    
});
// Social links
router.post('/new/social',verify, async(req, res) => {
    const resume = new Resume({
        facebookLink: req.body.facebookLink,
        instagramLink: req.body.instagramLink,
        linkedinLink: req.body.linkedinLink,
        twitterLink: req.body.twitterLink,
    });
    try{    
        await resume.save()
        res.status(200).send(resume);
    }
    catch(err){
        console.log(err);
    }
    
});

// Update a resume
   
router.put('/update/university',upload.single('file'),verify, async(req, res) => {
   // console.log(req.body)
    console.log(req.file);
    // const fileUploded = await uploadFile(req.file);
    // const { Location } = fileUploded;
    // console.log("location",Location)
    const resume = await Resume.findByIdAndUpdate(req.user._id, req.body,{new: true});
    //res.status(200).json(resume);
});



module.exports = router;

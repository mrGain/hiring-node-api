const router = require('express').Router();
const Jobs = require('../../models/jobs_model');


router.get('/', async(req, res) => {
    const jobs = await Jobs.find();
    res.json(jobs);
});

// Post a new job
router.post('/new', async(req, res) => {
    const job = new Jobs({
        collegeID: req.body.collegeID,
        jobName: req.body.jobName,
        post: req.body.post,
        location: req.body.location,
        type: req.body.type,
        ctcStipend: req.body.ctcStipend,
        jobDesc: req.body.jobDesc,
        workflow: req.body.workflow,
        eligibility: req.body.eligibility,
        documents: req.body.documents,
    });
    await job.save();
    res.json({message: 'Job added successfully'});
});

// Update a job
router.put('/update/:id', async(req, res) => {
    const job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {new: true});
    await job.save();
    res.json({message: 'Job updated successfully'});
});

// Delete any job
router.delete('/delete/:id', async(req, res) => {
    await Jobs.findByIdAndDelete(req.params.id);
    res.json({message: 'Job deleted successfully'});
});

module.exports = router;

const router = require('express').Router();
const mongoose = require('mongoose')
const verify = require('../../utils/User/verifyToken')
const Resume = require('../../models/resume_model')

// Get profile page
router.get('/', verify, async(req, res) => {
    const resume = await Resume.findById(req.user._id)

    res.json(resume)
});


module.exports = router;
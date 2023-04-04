const express = require('express');
const router = express.Router();
const Student = require('../../models/student_model');
const verify = require('../../utils/User/verifyToken');

router.get('/my-account',verify, async(req, res) => {
        const student = await Student.findById(req.user._id,{events: 0});
        res.json({user:student});
});

module.exports = router;
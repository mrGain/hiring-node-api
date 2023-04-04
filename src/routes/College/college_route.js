const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const College = require('../../models/college_model');
const verify = require('../../utils/User/verifyToken');

// router.get('/', async(req, res) => {
//     const colleges = await College.find();
//     res.json(colleges);
// });


// Register a new college
router.post('/register', async(req, res) => {
    const collegeExist = await findOne({ email: req.body.collegeEmail });
    if (collegeExist){
        return res.status(400).send("College with Email already exists.!!")
    }
    // Hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const college = new College({
        collegeName: req.body.collegeName,
        collegeAddress: req.body.collegeAddress,
        collegeEmail: req.body.collegeEmail,
        password: hashedPassword,
    });
    await college.save();
    res.json({message: 'College added successfully'});
});

// Login a college
router.post('/login', async(req, res) => {
    
    // check if the user exists
    const college = await findOne({ email: req.body.collegeEmail });
    if (!college){
        return res.status(400).send("College with Email doesnot exists.!!")
    }
    // check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, college.password);    
    if (!validPass){
        return res.status(400).send("Invalid Password.!!")
    }
    // Create and assign a token
    const token = jwt.sign({_id: college._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    res.json({
        token: token,
        college: college
    });
});
    

// Update a college
router.put('/update/:collegeID', async(req, res) => {
    try{
        const college = await College.findByIdAndUpdate(req.params.collegeID, req.body, {new: true});
        await college.save();
        res.json({message: 'College updated successfully'});
    }
    catch(err){
        res.json({message: err});
    }
    
});




module.exports = router;

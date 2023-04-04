require("dotenv").config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../../models/student_model');
const { loginValidation } = require('../../utils/User/validate');



router.post('/login', async (req, res) => {
    // VALIDATE A DATA BEFORE LOGIN
    // console.log("checking",req.body);
    const { error } = loginValidation(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    } 
    // CHECK IF USER EXISTS
    const user = await Student.findOne(
        {email: req.body.email},
        {events: 0}
    );
    if ( !user ){
        return  res.status(400).send({
            "message": "There is no user corresponding to the email address."
          })
    } 
    // CHECK IF PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass){
        return  res.status(400).send({
            "message": "Wrong password"
          })
    }

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {
        expiresIn: "7d"
    });
    res.json({
        accessToken: token,
        user: user
    });
})

module.exports = router;
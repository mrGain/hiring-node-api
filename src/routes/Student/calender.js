const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { model } = require('mongoose');
const verify = require('../../utils/User/verifyToken');

const calenderSchema = require('../../models/calender_model');
const Student = require('../../models/student_model');

const Calender = model("Calender", calenderSchema);


// Get all the events 
router.get("/",verify,async(req,res) =>{
    const events = await Calender.aggregate([
        { $match: { userID: mongoose.Types.ObjectId(req.user._id) } },
        { $project: { "id": "$_id", title:1, description:1, allDay:1, textColor:1, start:1,end:1,_id:0 }}
    ]);
    console.log(events);
    res.json({events: events});
})

// Add a event in calender
router.post('/new',verify,async(req,res) => {
    const event = new Calender({
        userID: req.user._id,
        title: req.body.title,
        description: req.body.description,
        allDay: req.body.allDay,
        textColor: req.body.textColor,
        start: req.body.start,
        end: req.body.end,
    });
    //await event.save();
    res.json({message: 'You are not permitted to add an event'});
})

// Update a event in calender
router.put('/:eventID',verify,async(req,res) => {
    const event = await Calender.findByIdAndUpdate(req.params.eventID, req.body, {new: true});
    res.json(event);
})

// Delete a event from calender
router.delete('/:eventID',verify, async(req,res) => {
    await Calender.findByIdAndRemove(req.params.eventID);
    res.json({message: 'Event deleted successfully'});
})

module.exports = router;
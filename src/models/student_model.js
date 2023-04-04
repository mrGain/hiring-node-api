const { Schema, model } = require("mongoose");

const calenderSchema = require("./calender_model");
const Board = require("./kanban_model");

const studentSchema = new Schema({
    displayName:{
        type: String,
        required: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
        minlength: 6
    },
    password:{
        type: String,
        required: true,
        minlength: 6,

    },
    photoURL:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    country:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },  
    zipCode:{
        type: String,   
        required: true,
        minlength: 6,
    },
    about:{ 
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250
    },
    role:{
        type: String,
        required: true,
        default: "student"
    },
    events:[calenderSchema],
    image:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = model('Student', studentSchema);
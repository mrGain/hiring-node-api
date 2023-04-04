const { model, Schema } = require("mongoose");

const calenderSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    description:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250
    },  
    allDay:{
        type: Boolean
    },
    textColor:{
        type: String,
        required: true
    },
    start:{
        type: Date,
        required: true,
        default: Date.now
    },
    end:{
        type: Date,
        required: true,
        default: Date.now
    },
   

})


module.exports = calenderSchema;

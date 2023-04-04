const { Schema, model } = require('mongoose');


const resumeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: false
    },
    universitySheetURL:{
        type: String,
        required: false
    },
    university:{
        type: String,
        required: false
    },
    program:{
        type: String,
        required: false
    },
    branch:{
        type: String,
        required: false
    },
    batch:{
        type: String,
        required: false
    },
    rollno:{
        type: String,
        required: false
    },
    sem1:{
        type: Number,
        required: false
    },
    sem2:{
        type: Number,
        required: false
    },
    sem3:{
        type: Number,
        required: false
    },
    sem4:{
        type: Number,
        required: false
    },
    sem5:{
        type: Number,
        required: false
    },
    sem6:{
        type: Number,
        required: false
    },
    sem7:{
        type: Number,
        required: false
    },
    sem8:{
        type: Number,
    },
    backlogs: {
        type: Number,
        required: false
    },
    highlights: {
        type: String,
        required: false
    },
    // 10th Standard here
    schoolSheetURL:{
        type: String,
        required: false
    },
    school:{
        type: String,
        required: false
    },
    schoolStream:{
        type: String,
        required: false
    },
    schoolBoard:{
        type: String,
        required: false
    },
    schoolBranch: {
        type: String,
        required: false
    },
    schoolpercentage:{
        type: Number,
        required: false,
        default: 0.00
    },
    schoolEducationType:{
        type: String,
        required: false
    },
    schoolDurationStart:{
        type: Date,
        required: false
    },
    schoolDurationEnd:{
        type: Date,
        required: false
    },
    schoolHighlights:{
        type: String,
        required: false
    },
    // Class 12th starts here
    school12SheetURL:{
        type: String,
        required: false
    },
    school12:{
        type: String,
    },
    school12Stream:{
        type: String,
    },
    school12Board:{
        type: String,
    },
    school12Branch:{
        type: String,
    },
    school12percentage: {
        type: Number
    },
    school12EducationType:{
        type: String,
        required: false
    },
    school12DurationStart:{
        type: Date,
        required: false,
        trim: true
    },
    school12DurationEnd:{
        type: Date,
        required: false,
        trim: true
    },
    school12Highlights:{
        type: String,
    },
    // Skills and Projects
    skills: {
        type: Array,
        required: false
    },
    projects: [{
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        skillsUsed: {
            type: String,
        },
    }],
    // Social Linkes
    facebookLink:{
        type: String,
        required: false
    },
    instagramLink:{
        type: String,
        required: false
    },
    linkedinLink:{
        type: String,
        required: false
    },
    twitterLink:{
        type: String,
        required: false
    },
})


module.exports = model('resume', resumeSchema);
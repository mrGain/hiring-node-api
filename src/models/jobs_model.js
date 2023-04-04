const { model, Schema } = require('mongoose');


const jobsSchema = new Schema({
    collegeID: {
        type: Schema.Types.ObjectId,
        ref: 'College'
    },
    jobName: {
        type: String,
    },
    post: {
        type: String,
    },
    location:{
        type: String, //Place
    },
    workType: {
        type: String, //Full Time, Part Time, Contract, Internship
    },
    type: {
        type: String,
    },
    ctcStipend: {
        type: String,
    },
    jobDesc: {
        type: String,
    },
    workflow: {
        type: Array,
    },
    eligibility: {         //[class10: null/8.5,class12:null,GPA:8.0,backlogs:2,branch:"EC,EE,SE"]
        class10: {
            type: Number,
            required: false
        },
        class12: {
            type: Number,
            required: false
        },
        GPA: {
            type: Number,
            required: false
        },
        backlogs: { 
            type: Number,
            required: false
        },
        branch: []

    },
    documents: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Jobs', jobsSchema);
    
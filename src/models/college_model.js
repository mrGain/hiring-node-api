const {model, Schema} = require('mongoose');

const collegeSchema = new Schema({   
    collegeEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    collegeName:{
        type: String,
        required: true
    },
    collegeAddress:{
        type: Array,
    },
    collegeBranch:{
        type: Array,
    },
    placementStatsYear:{
        type: Array,
    },
    placementStatsBranch:{
        type: Array,
    },
    trendingJobsCollege:{
        type: Array,
    }
});

module.exports = model('College', collegeSchema);
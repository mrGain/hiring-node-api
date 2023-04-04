const { Schema, model } = require('mongoose')

const cardsSchema = new Schema({
    columnID: {
        type: Schema.Types.ObjectId,
        ref: 'Column'
    },
    CardName: {
        type: String,
        required: true,
        minleanth: 3
    },
    description: {
        type: String,
        required: true,
        maxlength: 250,
    },
    completed: {
        type: Boolean,
        required: true,
    }    

});

const columnSchema = new Schema({ 
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 3
    },
});

// const boardScheam = new Schema({
//     userID: {
//         type: Schema.Types.ObjectId,
//         ref: 'Student',
//     },
//     columns: [columnSchema]
// });

module.exports.columnSchema = columnSchema;
module.exports.cardsSchema = cardsSchema;
// module.exports.boardScheam = boardScheam;


/*

  userID: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    columnID: {
        type: Schema.Types.ObjectId,
        ref: 'Column',
        required: true
    },

*/

const express = require('express');
const router = express.Router();
const { model } = require('mongoose');
const mongoose = require('mongoose');
const verify = require('../../utils/User/verifyToken');
const Student = require('../../models/student_model');
const { columnSchema,cardsSchema } = require('../../models/kanban_model');


// Creating Board



const Column = model("Column", columnSchema);
const Card = model("Card", cardsSchema);

//Get route will go here
router.get('/', verify, async (req, res) => {
    const userID = req.user._id;
    const board = await Column.aggregate([
        { $match: { userID: mongoose.Types.ObjectId(req.user._id) } },
        { $lookup:{ 
          from: "cards", 
          localField: "_id", 
          foreignField: "columnID", 
          as: "cards" 
        } },
        { $group: {
          "_id": "$userID",
          "columns": { $push: "$$ROOT" }
        }}
    ]);
    res.json(board);
});

// Post route will go here
router.post('/columns/new',verify, async(req, res) => {
  const column = new Column({
    userID: req.user._id,
    title: req.body.title,
  });
  try {
    await column.save();
    res.json(column);
  }
  catch (err) {
    res.status(400).send(err);
  }
   
});

// Put route will go here
router.patch('/columns/:columnID', async(req, res) => {
    const column = await Column.findByIdAndUpdate(req.params.columnID, req.body, {new: true})
    res.json(column);
}); 

// Delete route will go here
router.delete('/columns/:columnID', async(req, res) => {
    await Column.findByIdAndRemove(req.params.columnID);
    await Card.deleteMany({columnID: req.params.columnID});
    res.json({message: 'Column deleted successfully'});
});


//All the Cards route will go here
router.post('/cards/new/:columnId',verify, async(req, res) => {
  const card = new Card({
    columnID: req.params.columnId,
    CardName: req.body.CardName,
    description: req.body.description,
    completed: req.body.completed
  });
  try {
    await card.save();
    res.json(card);
  }
  catch (err) {
    res.status(400).send(err);
  }
   
});
router.put('/cards/:cardID', async(req, res) => {
    const card = await Card.findByIdAndUpdate(req.params.cardID, req.body, {new: true})
    res.json(card);
});
router.delete('/cards/:cardID', async(req, res) => {
    await Card.findByIdAndRemove(req.params.cardID);
    res.json({message: 'Card deleted successfully'});
});




module.exports = router;

require("dotenv").config();
const mongoose = require('mongoose');
const ErrorCode = require('../utils/consts');

const DB_URI = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Success');
  } catch (err) {
    console.error(err.message);
    process.exit(ErrorCode.DB_CONN_ERR);
  }
};

module.exports = connectDB;
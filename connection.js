require('dotenv').config({path : './.env'});
const mongoose = require('mongoose');
const { DATABASE_NAME } = require('./utils/constant');

const connectDB = async () => {
  try {
    const mongo = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("MongoDB connected on", mongo.connection.host);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

module.exports = connectDB

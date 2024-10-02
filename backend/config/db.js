const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Ensure this is included

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI; // Get the URI from environment variable
    if (!uri) {
      throw new Error('MONGODB_URI is undefined. Check your .env file.');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

console.log('MONGODB_URI:', process.env.MONGODB_URI);


module.exports = connectDB;











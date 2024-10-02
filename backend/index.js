const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const db = require('./config/db')
// connectDB(); // Connect to MongoDB
app.use(express.urlencoded());


app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Use authentication routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

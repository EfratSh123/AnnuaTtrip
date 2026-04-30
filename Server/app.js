const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Allows cross-origin requests
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tripDB')
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// Import routes
const locationRoutes = require("./routes/locations");
const teacherRoutes = require('./routes/teachers');
const studentRoutes = require('./routes/students');

// Authentication routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Use routes
app.use('/locations', locationRoutes);
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);

// Run the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
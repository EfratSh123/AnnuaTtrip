const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  studentId: String,
  latitude: Number,
  longitude: Number,
  time: Date
});

module.exports = mongoose.model('Location', locationSchema);
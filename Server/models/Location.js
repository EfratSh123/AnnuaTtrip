const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    unique: true,
    required: true

  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Location', LocationSchema);
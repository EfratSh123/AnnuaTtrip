const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  id: String,
  className: String
});

module.exports = mongoose.model('Student', studentSchema);
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  id: String,
  class: String
});

module.exports = mongoose.model('Student', studentSchema);
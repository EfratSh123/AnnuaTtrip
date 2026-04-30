const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const authMiddleware = require('../middleware/authMiddleware');

// Add student
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);
    const { name, id, className } = req.body;

    if (!name || !id || !className) {
      return res.status(400).json({ message: "Missing data" });
    }
    const student = new Student({
      name,
      id,
      className
    });
    console.log("STUDENT CREATED:", student);

    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Get students from teacher's class only
router.get('/', authMiddleware, async (req, res) => {
  try {
    const students = await Student.find({
      className: req.teacher.className
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get student by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOne({
      id: req.params.id,
    });

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();

const Teacher = require('../models/Teacher');
const authMiddleware = require('../middleware/authMiddleware');

// add teacher
router.post('/', async (req, res) => {
  try {
    const existing = await Teacher.findOne({ idNumber: req.body.idNumber });

    if (existing) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const teacher = new Teacher(req.body);
    await teacher.save();

    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get teacher by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ idNumber: req.params.id });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
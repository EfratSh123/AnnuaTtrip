const express = require('express');
const router = express.Router();

const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// add student
router.post('/student', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

// add teacher
router.post('/teacher', async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.send(teacher);
});

// get all students
router.get('/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// get all teachers
router.get('/teachers', async (req, res) => {
  const teachers = await Teacher.find();
  res.send(teachers);
});

// get students by id
router.get('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.send(student);
});

// get teachers by id
router.get('/teachers/:id', async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  res.send(teacher);
});


module.exports = router;
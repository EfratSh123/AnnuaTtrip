const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const router = express.Router();

/*Register a new teacher*/
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, idNumber, className, password } = req.body;

        // Check if teacher already exists
        const existingTeacher = await Teacher.findOne({ idNumber });
        if (existingTeacher) {
            return res.status(400).json({
                message: 'Teacher already exists'
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create teacher
        const teacher = new Teacher({
            firstName,
            lastName,
            idNumber,
            className,
            password: hashedPassword
        });

        await teacher.save();

        res.status(201).json({
            message: 'Teacher registered successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/*Login teacher*/
router.post('/login', async (req, res) => {
    try {
        const { idNumber, password } = req.body;

        const teacher = await Teacher.findOne({ idNumber });

        if (!teacher) {
            return res.status(404).json({
                message: 'Teacher not found'
            });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                teacherId: teacher._id,
                className: teacher.className
            },
            'SECRET_KEY',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            teacher: {
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                className: teacher.className
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Register a new student
router.post("/register/student", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
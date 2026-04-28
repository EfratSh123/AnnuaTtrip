const express = require('express');
const router = express.Router();

const Location = require('../models/Location');
// Utility function to convert DMS to Decimal Degrees
const { dmsToDecimal } = require('../utils/dms');

// add a new student location
router.post('/', async (req, res) => {
try {
    const { studentId, latitude, longitude, time } = req.body;

    // Validate the input data
    if (
        !studentId ||
        !latitude ||
        !longitude ||
        !time
      ) {
        return res.status(400).json({
          message: "Invalid data"
        });
      }
    
    // Convert DMS to Decimal Degrees
    const lat = dmsToDecimal(
      +Coordinates.Latitude.Degrees,
      +Coordinates.Latitude.Minutes,
      +Coordinates.Latitude.Seconds
    );

    const lon = dmsToDecimal(
      +Coordinates.Longitude.Degrees,
      +Coordinates.Longitude.Minutes,
      +Coordinates.Longitude.Seconds
    );

     const location = new Location({
        studentId,
        latitude,
        longitude,
        time
    });

    await location.save();

    res.status(201).json(location);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
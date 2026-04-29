const express = require('express');
const router = express.Router();

const Location = require('../models/Location');
// Utility function to convert DMS to Decimal Degrees
const { dmsToDecimal } = require('../utils/dms');

// add a new student location
router.post('/', async (req, res) => {
  try {
    const { ID, Coordinates, Time } = req.body;

    if (
      !ID ||
      !Coordinates ||
      !Coordinates.Latitude ||
      !Coordinates.Longitude ||
      !Time
    ) {
      return res.status(400).json({
        message: "Invalid data"
      });
    }

    // convert Latitude
    const latitude = dmsToDecimal(
      Number(Coordinates.Latitude.Degrees),
      Number(Coordinates.Latitude.Minutes),
      Number(Coordinates.Latitude.Seconds)
    );

    // convert Longitude
    const longitude = dmsToDecimal(
      Number(Coordinates.Longitude.Degrees),
      Number(Coordinates.Longitude.Minutes),
      Number(Coordinates.Longitude.Seconds)
    );

    const location = new Location({
      studentId: ID.toString(),
      latitude,
      longitude,
      time: Time
    });

    await location.save();

    res.status(201).json(location);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// get all student locations
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
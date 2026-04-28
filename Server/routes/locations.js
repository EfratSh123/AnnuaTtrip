const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
// Utility function to convert DMS to Decimal Degrees
const { dmsToDecimal } = require('../utils/dms');

router.post('/', async (req, res) => {
  const { ID, Coordinates, Time } = req.body;

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
    studentId: ID,
    latitude: lat,
    longitude: lon,
    time: Time
  });

  await location.save();

  res.send("Saved");
});

router.get('/', async (req, res) => {
  const locations = await Location.find();
  res.send(locations);
});

module.exports = router;
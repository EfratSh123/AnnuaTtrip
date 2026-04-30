const mongoose = require("mongoose");
const Location = require("../models/Location");

mongoose.connect("mongodb://127.0.0.1:27017/tripDB");

let baseLat = 32.085;
let baseLng = 34.781;

function randomOffset() {
  return (Math.random() - 0.5) * 0.002;
}

// returns a list of unique studentIds that have location entries in the database
async function getActiveStudents() {
  const students = await Location.distinct("studentId");
  return students;
}

async function simulate() {
  console.log("***Dynamic simulation started***");

  setInterval(async () => {
    try {
      const students = await getActiveStudents();

      for (const studentId of students) {
        await Location.findOneAndUpdate(
          { studentId },
          {
            studentId,
            latitude: baseLat + randomOffset(),
            longitude: baseLng + randomOffset(),
            time: new Date()
          },
          {upsert: true, new: true}
        );

        console.log(`***Location Updated ${studentId}***`);
      }
    } catch (err) {
      console.error(err);
    }
  }, 5000);
}

simulate();
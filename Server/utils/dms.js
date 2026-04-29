function dmsToDecimal(degrees, minutes, seconds) {
  return degrees + minutes / 60 + seconds / 3600;
}

module.exports = { dmsToDecimal };
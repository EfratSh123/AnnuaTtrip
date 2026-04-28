function dmsToDecimal(d, m, s) {
  return d + m / 60 + s / 3600;
}

module.exports = { dmsToDecimal };
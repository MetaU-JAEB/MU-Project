const mongoose = require('mongoose');
const Dimensions = require('./Dimensions');

const Car = mongoose.Schema(
  {
    dimensions: Dimensions,
    plates: String,
  },
  { _id: false },
);

module.exports = Car;

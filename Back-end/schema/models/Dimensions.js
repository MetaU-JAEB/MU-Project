const mongoose = require('mongoose');

const Dimensions = mongoose.Schema(
  {
    heightFts: Number,
    lengthFts: Number,
    widthFts: Number,
  },
  { _id: false },
);

module.exports = Dimensions;

const mongoose = require('mongoose');

const Ubication = mongoose.Schema(
  {
    lat: String,
    lng: String,
    address: String,
  },
  { _id: false },
);

module.exports = Ubication;

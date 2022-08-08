const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const Ubication = require('./Ubication');
const Dimensions = require('./Dimensions');

const Parking = mongoose.Schema({
    ownerId: mongoose.Schema.Types.ObjectId,
    images: [String],
    ubication: Ubication,
    price: Number,
    dimensions: Dimensions,
    isUnderShade: Boolean, // to boolean and null if don't know
    isInside: Boolean,
    isWorking: Boolean,
    totalLots: Number,
    availableLots: Number
}, { timestamps: true });

const ParkingModel = mongoose.model('Parking', Parking);
const ParkingTC = composeWithMongoose(ParkingModel);

module.exports = {
    ParkingTC : ParkingTC
}

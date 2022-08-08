const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const Rent = mongoose.Schema({
    parkingId: mongoose.Schema.Types.ObjectId,
    driverId: mongoose.Schema.Types.ObjectId,
    startAt: mongoose.Schema.Types.Date,
    endsAt: mongoose.Schema.Types.Date
}, { timestamps: true });

const RentModel = mongoose.model('Rent', Rent);
const RentTC = composeWithMongoose(RentModel);

module.exports = {
    RentTC : RentTC
}

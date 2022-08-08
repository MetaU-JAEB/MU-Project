const mongoose = require('mongoose');
const { composeWithMongooseDiscriminators } = require('graphql-compose-mongoose');
const BankCard = require('./BankCard');
const Car = require('./Car');

// pick a discriminatorKey
const DKey = 'type';
const enumUserType = {
    OWNER: 'Owner',
    DRIVER: 'Driver',
};

// DEFINE USER SCHEMAS
const User = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: [enumUserType.OWNER, enumUserType.DRIVER],
        description: 'User type Driver or Owner',
    },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    cards: [BankCard]
}, { timestamps: true });

// DEFINE DISCRIMINATOR SCHEMAS
const Driver = new mongoose.Schema({
    cars: [Car]
});

const Owner = new mongoose.Schema({
    parkingsIds: [mongoose.Schema.Types.ObjectId],
});

// set discriminator Key
User.set('discriminatorKey', DKey);

const UserModel = mongoose.model('User', User);

// create mongoose discriminator models
const DriverModel = UserModel.discriminator(enumUserType.DRIVER, Driver);
const OwnerModel = UserModel.discriminator(enumUserType.OWNER, Owner);

// create DiscriminatorTypeComposer
const baseOptions = { // regular TypeConverterOptions, passed to composeMongoose
    // example:
    // fields: {
    //     remove: ['parkings'],
    // },
};
// Discriminator Type Composers
const UserDTC = composeWithMongooseDiscriminators(UserModel, baseOptions);

// create Discriminator Types
const driverTypeConverterOptions = {
    // this options will be merged with baseOptions -> customizationsOptions
    // example :
    // fields: {
    //     remove: ['makeDate'],
    // },
};
const DriverTC = UserDTC.discriminator(DriverModel, driverTypeConverterOptions);
const OwnerTC = UserDTC.discriminator(OwnerModel);
// baseOptions -> customizationsOptions applied

module.exports = {
    UserModel: UserModel,
    DriverModel: DriverModel,
    OwnerModel: OwnerModel,
    UserDTC : UserDTC,
    DriverTC : DriverTC,
    OwnerTC : OwnerTC
}

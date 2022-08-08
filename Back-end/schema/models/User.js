const mongoose = require('mongoose');
const { composeWithMongooseDiscriminators } = require('graphql-compose-mongoose');
const BankCard = require('./BankCard');
const Car = require('./Car');

/**
 * Pick a discriminatorKey
 */
const DKey = 'type';

const enumUserType = {
    OWNER: 'Owner',
    DRIVER: 'Driver',
};

/**
 * Define user schemas
 */
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

/**
 * Define discriminator schemas
 */
const Driver = new mongoose.Schema({
    cars: [Car]
});

const Owner = new mongoose.Schema({
    parkingsIds: [mongoose.Schema.Types.ObjectId],
});

/**
 * Set discriminator Key
 */
User.set('discriminatorKey', DKey);

const UserModel = mongoose.model('User', User);

/**
 * Create mongoose discriminator models
 */
const DriverModel = UserModel.discriminator(enumUserType.DRIVER, Driver);
const OwnerModel = UserModel.discriminator(enumUserType.OWNER, Owner);

const baseOptions = {
    /**
     * Regular TypeConverterOptions, passed to composeMongoose
     * example:
     * fields: {
     *   remove: ['parkings'],
     * }
     */
};

/**
 * Discriminator Type Composers
 */
const UserDTC = composeWithMongooseDiscriminators(UserModel, baseOptions);

const driverTypeConverterOptions = {
    /**
    * We can add custom options for each user type if we want
    * this options will be merged with baseOptions
    * example :
    * fields: {
    *     remove: ['makeDate'],
    * },
    */
};
const DriverTC = UserDTC.discriminator(DriverModel, driverTypeConverterOptions);
const OwnerTC = UserDTC.discriminator(OwnerModel);

module.exports = {
    UserModel: UserModel,
    DriverModel: DriverModel,
    OwnerModel: OwnerModel,
    UserDTC: UserDTC,
    DriverTC: DriverTC,
    OwnerTC: OwnerTC
}

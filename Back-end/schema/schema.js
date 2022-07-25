const mongoose = require('mongoose');
const { composeWithMongooseDiscriminators, composeWithMongoose, composeMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');


// pick a discriminatorKey
const DKey = 'type';

const enumUserType = {
    OWNER: 'Owner',
    DRIVER: 'Driver',
};

// Auxiliar schemas
const BankCard = mongoose.Schema({
    number: String,
    expiration: String,
    CCV: String,
}, { _id: false });

const Dimensions = mongoose.Schema({
    heightFts: Number,
    lengthFts: Number,
    widthFts: Number,
}, { _id: false });

const Car = mongoose.Schema({
    dimensions : Dimensions
    plates: String
}, { _id: false });

const Ubication = mongoose.Schema({
    lat: String,
    lng: String,
    address: String,
}, { _id: false });

//

const Parking = mongoose.Schema({
    ownerId: mongoose.Schema.Types.ObjectId,
    images: [String],
    ubication: Ubication,
    price: Number,
    dimensions : Dimensions,
    isUnderShade: Number, // to boolean and null if don't know
    isInside: Number,
    isWorking: Number
    totalLots: Number,
    availableLots: Number
});

const Rent = mongoose.Schema({
    parkingId: mongoose.Schema.Types.ObjectId,
    driverId: mongoose.Schema.Types.ObjectId,
    startAt : mongoose.Schema.Types.Date,
    endsAt : mongoose.Schema.Types.Date
});


// DEFINE USER SCHEMAS
const User = new mongoose.Schema({
    // _id: field...
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
});

// DEFINE DISCRIMINATOR SCHEMAS
const Driver = new mongoose.Schema({
    cars: [Car]
});

const Owner = new mongoose.Schema({
    parkingsIds: [mongoose.Schema.Types.ObjectId],
});

// set discriminator Key
User.set('discriminatorKey', DKey);

// create base Model
const UserModel = mongoose.model('User', User);
const ParkingModel = mongoose.model('Parking', Parking);
const RentModel = mongoose.model('Rent', Rent);

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

// Type Composers
const ParkingTC = composeWithMongoose(ParkingModel);
const RentTC = composeWithMongoose(RentModel);


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

// console.log('Resolvers',DriverTC.getResolvers())
OwnerTC.addRelation(
    'parkings',
    {
        resolver: () => ParkingTC.getResolver('findByIds'),
        prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
            _ids: (source) => source.parkingsIds,
        },
        projection: { parkingsIds: 1 }, // point fields in source object, which should be fetched from DB
    },
);
OwnerTC.addRelation(
    'parkingsWithShade',
    {
        resolver: () => ParkingTC.getResolver('findMany'),
        prepareArgs: { // resolver `findMany` has `filter` arg, we may provide mongoose query to it
            filter: (source) => ({
                _operators: { // Applying criteria on fields which have
                    // operators enabled for them (by default, indexed fields only)
                    _id: { in: source.parkingsIds },
                    isUnderShade: 1,
                }
            })
        },
        projection: { parkingsIds: 1 }, // required fields from source object, 1=true
    },
);
// You may now use UserDTC to add fields to all Discriminators
schemaComposer.Query.addFields({
    driverMany: DriverTC.getResolver('findMany'),
    personMany: OwnerTC.getResolver('findMany'),
    userMany: UserDTC.getResolver('findMany'),

});
// Use DriverTC, `OwnerTC as any other ObjectTypeComposer.
schemaComposer.Mutation.addFields({
    driverCreate: DriverTC.getResolver('createOne'),
    personCreate: OwnerTC.getResolver('createOne'),
    userCreate: UserDTC.getResolver('createOne'),
});

const schema = schemaComposer.buildSchema();

/* describe('createOne', () => {
    it('should create child document without specifying DKey', async () => {
        const res = await graphql.graphql({
            schema,
            source: `mutation CreateUsers {
                        driverCreate(record: {name: "Queue XL", modelNumber: 360 }) {
                            record {
                            __typename
                            type
                            name
                            modelNumber
                            }
                        }
                        personCreate(record: {name: "mernxl", dob: 57275272}) {
                            record {
                            __typename
                            type
                            name
                            dob
                            }
                        }
                    }`
        });
        expect(res).toEqual({
            data: {
                driverCreate: {
                    record: { __typename: 'Driver', type: 'Driver',
                     name: 'Queue XL', modelNumber: 360 },
                },
                personCreate: {
                    record: { __typename: 'Owner', type: 'Owner', name: 'mernxl', dob: 57275272 },
                },
            },
        });
    });
}); */

module.exports = schema;

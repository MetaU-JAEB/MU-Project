const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    dimensions: Dimensions,
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
    dimensions: Dimensions,
    isUnderShade: Boolean, // to boolean and null if don't know
    isInside: Boolean,
    isWorking: Boolean,
    totalLots: Number,
    availableLots: Number
}, { timestamps: true });

const Rent = mongoose.Schema({
    parkingId: mongoose.Schema.Types.ObjectId,
    driverId: mongoose.Schema.Types.ObjectId,
    startAt: mongoose.Schema.Types.Date,
    endsAt: mongoose.Schema.Types.Date
}, { timestamps: true });

// Chat

const Conversation  = mongoose.Schema({
    ownerId : mongoose.Schema.Types.ObjectId,
    driverId : mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

const Message  = mongoose.Schema({
    conversationId : mongoose.Schema.Types.ObjectId,
    text : String,
    senderId : mongoose.Schema.Types.ObjectId
}, { timestamps: true });


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

// create base Model
const UserModel = mongoose.model('User', User);
const ParkingModel = mongoose.model('Parking', Parking);
const RentModel = mongoose.model('Rent', Rent);
// chat models
const ConversationModel = mongoose.model('Conversation', Conversation);
const MessageModel = mongoose.model('Message', Message);

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

// Chat
const ConversationTC = composeWithMongoose(ConversationModel);
const MessageTC = composeWithMongoose(MessageModel);


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

// Owner relations
OwnerTC.addRelation(
    'parkings',
    {
        resolver: () => ParkingTC.getResolver('findMany'),
        prepareArgs: { // resolver `findMany` has `filter` arg, we may provide mongoose query to it
            filter: (owner) => ({
                ownerId: owner._id,
            })
        },
        projection: { _id: 1 }, // required fields from Owner object, 1=true
    },
);
OwnerTC.addRelation(
    'parkingsWithShade',
    {
        resolver: () => ParkingTC.getResolver('findMany'),
        prepareArgs: { // resolver `findMany` has `filter` arg, we may provide mongoose query to it
            filter: (owner) => ({
                ownerId: owner._id,
                isUnderShade: 1
            })
        },
        projection: { _id: 1 }, // required fields from Owner object, 1=true
    },
);

/// Driver Relations
DriverTC.addRelation(
    'rents',
    {
        resolver: () => RentTC.getResolver('findMany'),
        prepareArgs: { // resolver `findMany` has `filter` arg, we may provide mongoose query to it
            filter: (driver) => ({
                driverId: driver._id
            })
        },
        projection: { _id: 1 }, // required fields from Driver object, 1=true
    },
);


//Parking Relations
ParkingTC.addRelation(
    'owner',
    {
        resolver: () => OwnerTC.getResolver('findOne'),
        prepareArgs: { // resolver `findOne` has `filter` arg, we may provide mongoose query to it
            filter: (parking) => ({
                _id: parking.ownerId
            })
        },
        projection: { ownerId: 1 }, // required fields from Parking object, 1=true
    },
);

ParkingTC.addRelation(
    'rents',
    {
        resolver: () => RentTC.getResolver('findMany'),
        prepareArgs: { // resolver `findMany` has `filter` arg, we may provide mongoose query to it
            filter: (parking) => ({
                parkingId: parking._id
            })
        },
        projection: { _id: 1 }, // required fields from Parking object, 1=true
    },
);

//Rent relations
RentTC.addRelation(
    'parking',
    {
        resolver: () => ParkingTC.getResolver('findOne'),
        prepareArgs: { // resolver `findOne` has `filter` arg, we may provide mongoose query to it
            filter: (rent) => ({
                _id: rent.parkingId
            })
        },
        projection: { parkingId: 1 }, // required fields from Rent object, 1=true
    },
);

RentTC.addRelation(
    'driver',
    {
        resolver: () => DriverTC.getResolver('findOne'),
        prepareArgs: { // resolver `findOne` has `filter` arg, we may provide mongoose query to it
            filter: (rent) => ({
                _id: rent.driverId
            })
        },
        projection: { driverId: 1 }, // required fields from Rent object, 1=true
    },
);


// chat relations
ConversationTC.addRelation(
    'driver',
    {
        resolver: () => DriverTC.getResolver('findOne'),
        prepareArgs: { // resolver `findOne` has `filter` arg, we may provide mongoose query to it
            filter: (conversation) => ({
                _id: conversation.driverId
            })
        },
        projection: { driverId: 1 }, // required fields from Conversation object, 1=true
    },
);
ConversationTC.addRelation(
    'owner',
    {
        resolver: () => OwnerTC.getResolver('findOne'),
        prepareArgs: { // resolver `findOne` has `filter` arg, we may provide mongoose query to it
            filter: (conversation) => ({
                _id: conversation.ownerId
            })
        },
        projection: { ownerId: 1 }, // required fields from Conversation object, 1=true
    },
);
ConversationTC.addRelation(
    'messages',
    {
        resolver: () => MessageTC.getResolver('findMany'),
        prepareArgs: { // resolver `findMany` has `filter` arg, we may provide mongoose query to it
            filter: (conversation) => ({
                conversationId: conversation._id
            })
        },
        projection: { _id: 1 }, // required fields from Conversation object, 1=true
    },
);


MessageTC.addRelation(
    'conversation',
    {
        resolver: () => ConversationTC.getResolver('findOne'),
        prepareArgs: { // resolver `findOne` has `filter` arg, we may provide mongoose query to it
            filter: (message) => ({
                _id: message.conversationId
            })
        },
        projection: { conversationId: 1 }, // required fields from Message object, 1=true
    },
);
MessageTC.addRelation(
    'sender',
    {
        resolver: () => UserDTC.getResolver('findOne'),
        prepareArgs: { // resolver `findOne` has `filter` arg, we may provide mongoose query to it
            filter: (message) => ({
                _id: message.senderId
            })
        },
        projection: { senderId: 1 }, // required fields from Message object, 1=true
    },
);



// Authentication


UserDTC.addResolver({
    kind: 'mutation',
    name: 'userRegister',
    args: {
        email: 'String!',
        password: 'String!',
        type: 'String!',
        firstName: 'String!',
        lastName: 'String!'
    },
    type: UserDTC.getResolver('updateById').getType(),
    resolve: async ({ args, context }) => {
        try {

            let existUser = null;
            if (isNaN(Number(args.email))) {
                existUser = await UserModel.findOne({ email: args.email });
            } else {
                existUser = await UserModel.findOne({ phone: Number(args.email) });
            }
            if (existUser) {
                throw new Error('User exists already.')
            }
            const hashedPassword = await bcrypt.hash(args.password, 12);

            const newUser = new UserModel({
                email: args.email,
                password: hashedPassword,
                type: args.type,
                firstName: args.firstName,
                lastName: args.lastName
            });

            const result = await newUser.save();


            return {
                recordId: result._id,
                record: result

            }
        } catch (error) {
            throw error;
        }

    }
})

UserDTC.addFields({
    token: {
        type: 'String',
        description: 'Token of authenticated user.'
    }
})


UserDTC.addResolver({
    kind: 'mutation',
    name: 'userLogin',
    args: {
        email: 'String!',
        password: 'String!',
    },
    type: UserDTC.getResolver('updateById').getType(),
    resolve: async ({ args, context }) => {

        let user = null;
        if (isNaN(Number(args.email))) {
            user = await UserModel.findOne({ email: args.email });
        } else {
            user = await UserModel.findOne({ phone: Number(args.email) });
        }

        if (!user) {
            throw new Error('User does not exist.')
        }


        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
            throw new Error('Password is not correct.');
        }


        const token = jwt.sign({
            userId: user._id,
            userEmail: user.email,
            userPassword: user.password
        }, "secretkey", {
            expiresIn: '1h'
        });

        return {
            recordId: user._id,
            record: {
                token: token,
                _id: user._id,
                type: user.type,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                cards: [user.cards.map((card) => card.number)]
            }
        }
    }
})


// You may now use UserDTC to add fields to all Discriminators
schemaComposer.Query.addFields({
    // users
    driverMany: DriverTC.getResolver('findMany'),
    ownerMany: OwnerTC.getResolver('findMany'),
    userMany: UserDTC.getResolver('findMany'),

    parkingMany: ParkingTC.getResolver('findMany'),
    rentMany: RentTC.getResolver('findMany'),

    // chat related
    conversationMany: ConversationTC.getResolver('findMany'),
    messageMany: MessageTC.getResolver('findMany'),

    // users
    driverById: DriverTC.getResolver('findById'),
    ownerById: OwnerTC.getResolver('findById'),
    userById: UserDTC.getResolver('findById'),

    parkingById: ParkingTC.getResolver('findById'),
    rentById: RentTC.getResolver('findById'),

    //caht related
    conversationById: ConversationTC.getResolver('findById'),
    messageById: MessageTC.getResolver('findById'),

});
// Use DriverTC, `OwnerTC as any other ObjectTypeComposer.
schemaComposer.Mutation.addFields({
    // creates users
    driverCreate: DriverTC.getResolver('createOne'),
    ownerCreate: OwnerTC.getResolver('createOne'),
    userCreate: UserDTC.getResolver('createOne'),

    // creates
    parkingCreate: ParkingTC.getResolver('createOne'),
    rentCreate: RentTC.getResolver('createOne'),

    // chat related
    conversationCreate: ConversationTC.getResolver('createOne'),
    messageCreate: MessageTC.getResolver('createOne'),


    parkingCreateMany: ParkingTC.getResolver('createMany'),

    // updates users
    driverUpdate: DriverTC.getResolver('updateOne'),
    ownerUpdate: OwnerTC.getResolver('updateOne'),
    userUpdate: UserDTC.getResolver('updateOne'),

    // updates
    parkingUpdate: ParkingTC.getResolver('updateOne'),
    rentUpdate: RentTC.getResolver('updateOne'),

    // chat related
    conversationUpdate: ConversationTC.getResolver('updateOne'),
    messageUpdate: MessageTC.getResolver('updateOne'),

    // hand-made
    userRegister: UserDTC.getResolver('userRegister'),
    userLogin: UserDTC.getResolver('userLogin')

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
                        ownerCreate(record: {name: "mernxl", dob: 57275272}) {
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
                ownerCreate: {
                    record: { __typename: 'Owner', type: 'Owner', name: 'mernxl', dob: 57275272 },
                },
            },
        });
    });
}); */

module.exports = schema;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserModel, DriverModel, OwnerModel, UserDTC, OwnerTC, DriverTC } = require('./models/User');
const { ParkingTC } = require('./models/Parking');
const { RentTC } = require('./models/Rent');
const { ConversationTC } = require('./models/Conversation');
const { MessageTC } = require('./models/Message');

// User Relations
UserDTC.addRelation(
    'conversations',
    {
        resolver: () => ConversationTC.getResolver('findMany'),
        prepareArgs: { // resolver `findMany` has `filter` arg, we may provide mongoose query to it
            filter: (user) => ({
                OR: [
                    { ownerId: user._id },
                    { driverId: user._id },
                ]
            })
        },
        projection: { _id: 1 }, // required fields from User object, 1=true
    },
);

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

// Login/register
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

module.exports = {
    UserDTC: UserDTC,
    DriverTC: DriverTC,
    OwnerTC: OwnerTC,
    ParkingTC: ParkingTC,
    RentTC: RentTC,
    ConversationTC: ConversationTC,
    MessageTC: MessageTC
}

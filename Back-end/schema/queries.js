const { UserDTC,DriverTC, OwnerTC, ParkingTC, RentTC, ConversationTC, MessageTC  } = require('./relations')
// Getting objects after the relations are applied
const queries = {
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

    //chat related
    conversationById: ConversationTC.getResolver('findById'),
    messageById: MessageTC.getResolver('findById'),
}

module.exports = queries;

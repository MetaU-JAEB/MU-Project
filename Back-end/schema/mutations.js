const { UserDTC,DriverTC, OwnerTC, ParkingTC, RentTC, ConversationTC, MessageTC  } = require('./relations')
// Getting objects after the relations are applied
const mutations = {
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

    // creates many
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
}

module.exports = mutations

const {
  UserDTC,
  DriverTC,
  OwnerTC,
  ParkingTC,
  RentTC,
  ConversationTC,
  MessageTC,
} = require('./relations');
/**
 *  Getting objects after relations are applied
 */

const userMutations = {
  userCreate: UserDTC.getResolver('createOne'),
  userUpdate: UserDTC.getResolver('updateOne'),
  userRegister: UserDTC.getResolver('userRegister'),
  userLogin: UserDTC.getResolver('userLogin'),

  driverCreate: DriverTC.getResolver('createOne'),
  driverUpdate: DriverTC.getResolver('updateOne'),

  ownerCreate: OwnerTC.getResolver('createOne'),
  ownerUpdate: OwnerTC.getResolver('updateOne'),
};
const parkingMutations = {
  parkingCreate: ParkingTC.getResolver('createOne'),
  parkingCreateMany: ParkingTC.getResolver('createMany'),
  parkingUpdate: ParkingTC.getResolver('updateOne'),
};
const rentMutations = {
  rentCreate: RentTC.getResolver('createOne'),
  rentUpdate: RentTC.getResolver('updateOne'),
};
const conversationMutations = {
  conversationCreate: ConversationTC.getResolver('createOne'),
  conversationUpdate: ConversationTC.getResolver('updateOne'),
};
const messageMutations = {
  messageCreate: MessageTC.getResolver('createOne'),
  messageUpdate: MessageTC.getResolver('updateOne'),
};

const mutations = {
  ...userMutations,
  ...parkingMutations,
  ...rentMutations,
  ...conversationMutations,
  ...messageMutations,
};

module.exports = mutations;

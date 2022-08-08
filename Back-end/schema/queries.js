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

const userQueries = {
  userMany: UserDTC.getResolver('findMany'),
  userById: UserDTC.getResolver('findById'),

  driverMany: DriverTC.getResolver('findMany'),
  driverById: DriverTC.getResolver('findById'),

  ownerMany: OwnerTC.getResolver('findMany'),
  ownerById: OwnerTC.getResolver('findById'),
};
const parkingQueries = {
  parkingMany: ParkingTC.getResolver('findMany'),
  parkingById: ParkingTC.getResolver('findById'),
};
const rentQueries = {
  rentMany: RentTC.getResolver('findMany'),
  rentById: RentTC.getResolver('findById'),
};
const conversationQueries = {
  conversationMany: ConversationTC.getResolver('findMany'),
  conversationById: ConversationTC.getResolver('findById'),
};
const messageQueries = {
  messageMany: MessageTC.getResolver('findMany'),
  messageById: MessageTC.getResolver('findById'),
};

const queries = {
  ...userQueries,
  ...parkingQueries,
  ...rentQueries,
  ...conversationQueries,
  ...messageQueries,
};

module.exports = queries;

const { UserDTC, OwnerTC, DriverTC } = require('./models/User');
const { ParkingTC } = require('./models/Parking');
const { RentTC } = require('./models/Rent');
const { ConversationTC } = require('./models/Conversation');
const { MessageTC } = require('./models/Message');

/**
 * User Relations
 */
UserDTC.addRelation('conversations', {
  /**
   * Resolver `findMany` has `filter` arg, we may provide mongoose query to it
   */
  resolver: () => ConversationTC.getResolver('findMany'),
  prepareArgs: {
    filter: user => ({
      OR: [{ ownerId: user._id }, { driverId: user._id }],
    }),
  },
  /**
   * Required fields (_id) from User object, 1=true
   */
  projection: { _id: 1 },
});

/**
 * Owner Relations
 */
OwnerTC.addRelation('parkings', {
  resolver: () => ParkingTC.getResolver('findMany'),
  prepareArgs: {
    filter: owner => ({
      ownerId: owner._id,
    }),
  },
  projection: { _id: 1 },
});

OwnerTC.addRelation('parkingsWithShade', {
  resolver: () => ParkingTC.getResolver('findMany'),
  prepareArgs: {
    filter: owner => ({
      ownerId: owner._id,
      isUnderShade: 1,
    }),
  },
  projection: { _id: 1 },
});

/**
 * Driver Relations
 */
DriverTC.addRelation('rents', {
  resolver: () => RentTC.getResolver('findMany'),
  prepareArgs: {
    filter: driver => ({
      driverId: driver._id,
    }),
  },
  projection: { _id: 1 },
});

/**
 * Parking Relations
 */
ParkingTC.addRelation('owner', {
  /**
   * Resolver `findOne` has `filter` arg, we may provide mongoose query to it
   */
  resolver: () => OwnerTC.getResolver('findOne'),
  prepareArgs: {
    filter: parking => ({
      _id: parking.ownerId,
    }),
  },
  projection: { ownerId: 1 },
});

ParkingTC.addRelation('rents', {
  resolver: () => RentTC.getResolver('findMany'),
  prepareArgs: {
    // resolver `findMany` has `filter` arg, we may provide mongoose query to it
    filter: parking => ({
      parkingId: parking._id,
    }),
  },
  projection: { _id: 1 }, // required fields from Parking object, 1=true
});

/**
 * Rent Relations
 */
RentTC.addRelation('parking', {
  resolver: () => ParkingTC.getResolver('findOne'),
  prepareArgs: {
    filter: rent => ({
      _id: rent.parkingId,
    }),
  },
  projection: { parkingId: 1 },
});

RentTC.addRelation('driver', {
  resolver: () => DriverTC.getResolver('findOne'),
  prepareArgs: {
    filter: rent => ({
      _id: rent.driverId,
    }),
  },
  projection: { driverId: 1 },
});

/**
 * Chat Relations
 */
ConversationTC.addRelation('driver', {
  resolver: () => DriverTC.getResolver('findOne'),
  prepareArgs: {
    filter: conversation => ({
      _id: conversation.driverId,
    }),
  },
  projection: { driverId: 1 },
});

ConversationTC.addRelation('owner', {
  resolver: () => OwnerTC.getResolver('findOne'),
  prepareArgs: {
    filter: conversation => ({
      _id: conversation.ownerId,
    }),
  },
  projection: { ownerId: 1 },
});

ConversationTC.addRelation('messages', {
  resolver: () => MessageTC.getResolver('findMany'),
  prepareArgs: {
    filter: conversation => ({
      conversationId: conversation._id,
    }),
  },
  projection: { _id: 1 },
});

MessageTC.addRelation('conversation', {
  resolver: () => ConversationTC.getResolver('findOne'),
  prepareArgs: {
    filter: message => ({
      _id: message.conversationId,
    }),
  },
  projection: { conversationId: 1 },
});

MessageTC.addRelation('sender', {
  resolver: () => UserDTC.getResolver('findOne'),
  prepareArgs: {
    filter: message => ({
      _id: message.senderId,
    }),
  },
  projection: { senderId: 1 },
});

module.exports = {
  UserDTC: UserDTC,
  DriverTC: DriverTC,
  OwnerTC: OwnerTC,
  ParkingTC: ParkingTC,
  RentTC: RentTC,
  ConversationTC: ConversationTC,
  MessageTC: MessageTC,
};

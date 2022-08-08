const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const Conversation = mongoose.Schema(
  {
    ownerId: mongoose.Schema.Types.ObjectId,
    driverId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true },
);

const ConversationModel = mongoose.model('Conversation', Conversation);
const ConversationTC = composeWithMongoose(ConversationModel);

module.exports = {
  Conversation: Conversation,
  ConversationTC: ConversationTC,
};

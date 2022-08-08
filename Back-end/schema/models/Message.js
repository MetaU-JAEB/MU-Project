const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const Message = mongoose.Schema({
    conversationId: mongoose.Schema.Types.ObjectId,
    text: String,
    senderId: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const MessageModel = mongoose.model('Message', Message);
const MessageTC = composeWithMongoose(MessageModel);

module.exports = {
    MessageTC : MessageTC
}

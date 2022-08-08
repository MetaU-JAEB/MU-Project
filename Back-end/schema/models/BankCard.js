const mongoose = require('mongoose');

const BankCard = mongoose.Schema({
    number: String,
    expiration: String,
    CCV: String,
}, { _id: false });

module.exports = BankCard;

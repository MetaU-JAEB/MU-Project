const mongoose = require('mongoose')


const LanguagesSchema = new mongoose.Schema({
    language: String,
    skill: {
      type: String,
      enum: ['basic', 'fluent', 'native'],
    },
});

module.exports = {
    Languages : mongoose.model('Languages', LanguagesSchema),
    LanguagesSchema : LanguagesSchema
}

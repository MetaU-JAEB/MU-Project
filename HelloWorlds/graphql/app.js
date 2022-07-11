const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose');
const {ApolloServer, gql} = require('apollo-server-express')
const schema = require('./schema/schemaMongoose')

/// GATTING THE DB URL
const mongoURL = process.env.MONGO
//console.log("mongooo",mongoURL);

mongoose.connect(mongoURL);
mongoose.connection.once('open', () => {
    console.log('Connected to database');
})

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}))

app.listen(4000, () => {
    console.log('listening on port 4000')
})

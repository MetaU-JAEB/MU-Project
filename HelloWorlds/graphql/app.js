const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express')
const schema = require('./schema/schemaDiscriminatorWithRelations')

/// GATTING THE DB URL
const mongoURL = process.env.MONGO
//console.log("mongooo",mongoURL);

/* mongoose.connect(mongoURL);
mongoose.connection.once('open', () => {
    console.log('Connected to database');
}) */

const app = express()

const server = new ApolloServer({
    schema: schema,
    context() {
        // This role should actually come from a JWT or something
        return { role: 'admin' };
    },
});

const estart = async () => {
    await server.start()
    server.applyMiddleware({ app })
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );

}
estart()





/*
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}))

app.listen(4000, () => {
    console.log('listening on port 4000')
})
 */

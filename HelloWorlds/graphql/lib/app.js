const express = require('express');

const mongoose = require('mongoose');

const {
  ApolloServer
} = require('apollo-server-express');

const schema = require('./schema/schemaDiscriminatorWithRelations'); /// GATTING THE DB URL


const mongoURL = process.env.MONGO; // console.log("mongooo",mongoURL);

mongoose.connect(mongoURL);
mongoose.connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Connected to databasee');
});
const app = express();
const server = new ApolloServer({
  schema,

  context() {
    // This role should actually come from a JWT or something
    return {
      role: 'admin'
    };
  }

});

const estart = async () => {
  await server.start();
  server.applyMiddleware({
    app
  }); // eslint-disable-next-line no-console

  app.listen({
    port: 4000
  }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
};

estart();
/*
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}))

app.listen(4000, () => {
    console.log('listening on port 4000')
})
 */
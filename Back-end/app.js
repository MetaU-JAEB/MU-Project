const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema/schema');
const isAuth = require('./middleware/is-auth');

/**
 * GETTING THE DB URL
 */
const mongoURL = process.env.MONGO;

mongoose.connect(mongoURL);
mongoose.connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.info('Connected to database');
});

const app = express();

app.use(isAuth);

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    /**
     * Getting req from the middleware isAuth,
     * if there is no user (req), there won't be user (res)
     */
    const user = req.user || null;
    return { user: user, isAuth: req.isAuth };
  },
});

const estart = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // eslint-disable-next-line no-console
  app.listen({ port: 4000 }, () =>
    console.info(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  );
};
estart();

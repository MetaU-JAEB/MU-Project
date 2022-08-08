const { schemaComposer } = require('graphql-compose');
const queries = require('./queries');
const mutations = require('./mutations');

// Adding the queries we need
schemaComposer.Query.addFields(queries);
// And the mutations we want
schemaComposer.Mutation.addFields(mutations);

const schema = schemaComposer.buildSchema();

module.exports = schema;

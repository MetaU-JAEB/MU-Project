const { schemaComposer } = require('graphql-compose');
const queries = require('./queries');
const mutations = require('./mutations');

/**
 * Adding the queries and mutations we selected
 */
schemaComposer.Query.addFields(queries);
schemaComposer.Mutation.addFields(mutations);

const schema = schemaComposer.buildSchema();

module.exports = schema;

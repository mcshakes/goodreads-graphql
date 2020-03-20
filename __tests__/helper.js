const { ApolloServer } = require("apollo-server");
const { createTestClient } = require("apollo-server-test")
const typeDefs = require('../schema');
const resolvers = require('../resolvers');

const createTestServer = ctx => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        mockEntireSchema: false,
        mocks: true,
        context: () => ctx
    })

    return createTestClient(server)
}

module.exports = createTestServer;
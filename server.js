require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const GoodReadsAPI = require('./datasources/goodreads');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        goodreadsAPI: new GoodReadsAPI()
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
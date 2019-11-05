// const express = require("express");

// const graphqlHTTP = require("express-graphql");
// const schema = require("./schema");

// const app = express();

// app.use("/graphql", graphqlHTTP({
//     schema,
//     graphiql: true
// }));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

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
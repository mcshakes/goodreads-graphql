// const express = require("express");
// require('dotenv').config()
// const graphqlHTTP = require("express-graphql");
// const schema = require("./schema");

// const app = express();

// app.use("/graphql", graphqlHTTP({
//     schema,
//     graphiql: true
// }));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');

const GoodReadsAPI = require('./datasources/goodreads');


const resolvers = {
    Query: {
        author: (name) => books,
    },
};

const server = new ApolloServer({
    typeDefs,
    dataSources: () => ({
        goodreadsAPI: new GoodReadsAPI()
    })
});

// const server = new ApolloServer({
//     typeDefs,
//     dataSources: () => ({
//       launchAPI: new LaunchAPI(),
//       userAPI: new UserAPI({ store })
//     })
//   });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
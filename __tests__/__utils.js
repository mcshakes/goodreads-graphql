import {
    dataSources,
    ,
    typeDefs,
    resolvers,
    ApolloServer,
    GoodReadsAPI,
    store,
  } from '../';

const constructTestServer = ({ context = defaultContext } = {}) => {
    const grAPI = new GoodReadsAPI();
  
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({ grAPI }),
      context,
    });
  
    return { server, grAPI };
  };
  
  module.exports.constructTestServer = constructTestServer;
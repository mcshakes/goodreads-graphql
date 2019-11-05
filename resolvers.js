module.exports = {
    Query: {
        author: (_, { name }, { dataSources }) => dataSources.goodreadsAPI.getAuthor({ name })
    }
};
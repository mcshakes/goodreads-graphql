module.exports = {
    Query: {
        author: (_, { name }, { dataSources }) => dataSources.goodreadsAPI.getAuthor({ name }),

        authorData: (_, { id }, { dataSources }) => dataSources.goodreadsAPI.getAuthorData({ authorId: id }),

        bookData: (_, { id }, { dataSources }) => dataSources.goodreadsAPI.getInfoForBook({ bookId: id })
    }
};
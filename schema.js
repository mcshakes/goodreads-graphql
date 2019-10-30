const axios = require("axios");
const xmlParser = require("xml2json");

const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLList, GraphQLString, GraphQLSchema } = require("graphql");

// Author by name
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        }
    })
})

// Full Author Data and Works
const AuthorDataType = new GraphQLObjectType({
    name: "AuthorData",
    fields: () => ({
        fans_count: { type: GraphQLInt },
        books: { type: new GraphQLList(BookType) }
    })
})

// Book Type

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        num_pages: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        author: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://www.goodreads.com/api/author_url/${args.name}?key=${process.env.API_KEY}`)
                    .then(res => {
                        return xmlParser.toJson(res.data);
                    })
                    .then(newJSON => {
                        let body = JSON.parse(newJSON);
                        return body.GoodreadsResponse.author
                    });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
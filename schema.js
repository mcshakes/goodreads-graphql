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
        fans_count: { type: GraphQLString },
        books: { type: new GraphQLList(BookType) }
    })
})

// Book Type

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLInt },
        isbn: { type: GraphQLInt },
        title: { type: GraphQLString },
        num_pages: { type: GraphQLInt },
        description: { type: GraphQLString },
        published: { type: GraphQLString },
        publisher: { type: GraphQLString }
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
        },
        authorData: {
            type: AuthorDataType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return axios.get(`https://www.goodreads.com/author/show/${args.id}?format=xml&key=${process.env.API_KEY}`)
                    .then(res => {
                        return xmlParser.toJson(res.data);
                    })
                    .then(newJSON => {
                        let body = JSON.parse(newJSON);
                        return {
                            author: body.GoodreadsResponse.author,
                            books: body.GoodreadsResponse.author.books.book.map(book => {
                                return {
                                    id: book.id.$t,
                                    isbn: book.isbn,
                                    title: book.title,
                                    num_pages: book.num_pages,
                                    publisher: book.publisher,
                                    published: book.published,
                                    description: book.description
                                }
                            })
                        }
                    })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
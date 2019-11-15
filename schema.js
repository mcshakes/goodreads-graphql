//         authorData: {
//             type: AuthorDataType,
//             args: {
//                 id: { type: GraphQLID }
//             },
//             resolve(parent, args) {
//                 return axios.get(`https://www.goodreads.com/author/show/${args.id}?format=xml&key=${process.env.API_KEY}`)
//                     .then(res => {
//                         return xmlParser.toJson(res.data);
//                     })
//                     .then(newJSON => {
//                         let body = JSON.parse(newJSON);
//                         return {
//                             author: body.GoodreadsResponse.author,
//                             books: body.GoodreadsResponse.author.books.book.map(book => {
//                                 return {
//                                     id: book.id.$t,
//                                     isbn: book.isbn,
//                                     title: book.title,
//                                     num_pages: book.num_pages,
//                                     publisher: book.publisher,
//                                     published: book.published,
//                                     description: book.description
//                                 }
//                             })
//                         }
//                     })
//             }
//         }
//     }
// });

const { gql } = require('apollo-server');

const typeDefs = gql`
    type Author {
        id: ID
        name: String
        link: String
    }

    input AuthorInput {
        name: String!
    }

    type NullType {
        nil: Boolean!
    }

    type AuthorData {
        author: Author!
        books: [Book]
    }

    type Query {
        book: Book!
        author(name: String): Author!
        authorData(id: ID): AuthorData!
    }

    type Book {
        id: ID!
        isbn: String
        title: String
        num_pages: String
        description: String
        published: String
        publisher: String
    }
`

module.exports = typeDefs;
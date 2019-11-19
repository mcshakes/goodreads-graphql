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
        about: String
        influences: String
        hometown: String
        works_count: String
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
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
        bookData(id: ID): Book!

    }

    type Book {
        id: ID!
        isbn: String
        title: String
        num_pages: String
        description: String
        published: String
        publisher: String
        average_rating: String
        ratings_count: String
        text_reviews_count: String
        is_ebook: Boolean
        language_code: String
        similar_books: [Book]
    }
`

module.exports = typeDefs;
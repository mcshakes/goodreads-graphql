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
        getGroupByName(query: String): Group!
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

    type Group {
        id: ID!,
        title: String,
        access: String,
        users_count: String,
        image_url: String,
        small_image_url: String,
        last_activity_at: String
    }
`

module.exports = typeDefs;
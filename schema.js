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

    type Groups {
        total: String,
        groups: [Group!]
    }

    type Query {
        book: Book!
        author(name: String): Author!
        authorData(id: ID): AuthorData!
        bookData(id: ID): Book!
        groupsByName(query: String): Groups!
        groupData(id: ID): GroupData!
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
        id: ID,
        title: String,
        access: String,
        users_count: String,
        image_url: String,
        small_image_url: String,
        last_activity_at: String
    }

    type GroupData {
        id: ID,
        title: String,
        description: String,
        display_topics_per_folder: String,
        bookshelves_public_flag: Boolean,
        add_books_flag: Boolean,
        add_events_flag: String,
        polls_flag: String,
        discussion_public_flag: String,
        real_world_flag: String,
        accepting_new_members_flag: String,
        category: String,
        subcategory: String,
        rules: String,
        link: String,
        image_url: String,
        group_users_count: String,
        access: String,
        last_activity_at: String,
        display_folder_count: String
    }
`

module.exports = typeDefs;
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

    type AuthorShort {
        id: ID,
        name: String,
        user_id: String
    }

    type BookShort {
        id: ID!
        title: String,
        publication_year: String,
        author: AuthorShort
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

    type Folder {
        id: ID,
        name: String,
        items_count: String,
        sub_items_count: String,
        updated_at: String
    }

    type GroupBook {
        id: ID!,
        updated_at: String,
        started_reading_at: String,
        finish_reading_at: String
        book: BookShort
    }

    type GroupData {
        id: ID,
        title: String,
        description: String,
        display_topics_per_folder: String,
        bookshelves_public_flag: [Boolean],
        add_books_flag: Boolean,
        add_events_flag: Boolean,
        polls_flag: Boolean,
        discussion_public_flag: Boolean,
        real_world_flag: Boolean,
        accepting_new_members_flag: Boolean,
        category: String,
        subcategory: String,
        rules: String,
        link: String,
        image_url: String,
        group_users_count: String,
        access: String,
        last_activity_at: String,
        display_folder_count: String,
        folders: [Folder],
        currently_reading: [GroupBook]
    }
`

module.exports = typeDefs;
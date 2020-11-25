const { RESTDataSource } = require('apollo-datasource-rest');
const xmlParser = require("xml2json");
const _ = require("lodash");


class GoodReadsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://www.goodreads.com/';
    }

    async getAuthor(nameObject) {

        return this.get(this.baseURL + `api/author_url/${nameObject.name}?key=${process.env.API_KEY}`)
            .then(res => {
                return xmlParser.toJson(res);
            })
            .then(newJSON => {
                let body = JSON.parse(newJSON);
                return body.GoodreadsResponse.author
            });
    }

    async getAuthorData(inputObject) {
        let xmlResp = await this.get(this.baseURL + `author/show/${inputObject.authorId}?format=xml&key=${process.env.API_KEY}`)

        let resp = await xmlParser.toJson(xmlResp);
        let newJSON = JSON.parse(resp);

        const theAuthor = newJSON.GoodreadsResponse.author;
        const about = newJSON.GoodreadsResponse.author.about;
        const initBookArr = newJSON.GoodreadsResponse.author.books.book

        const finalArr = initBookArr.map(book => {
            return _.mapValues(book, val => val.nil ? null : val)
        })

        return {
            author: theAuthor,
            about: about,
            influences: newJSON.GoodreadsResponse.author.influences,
            hometown: newJSON.GoodreadsResponse.author.hometown,
            works_count: newJSON.GoodreadsResponse.author.works_count,
            books: finalArr.map(book => {
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
    };

    async getInfoForBook(inputObject) {
        let xmlResp = await this.get(this.baseURL + `book/show/${inputObject.bookId}?format=xml&key=${process.env.API_KEY}`)

        let resp = await xmlParser.toJson(xmlResp);
        let newJSON = JSON.parse(resp);

        const theBook = newJSON.GoodreadsResponse.book;
        const similarWorks = newJSON.GoodreadsResponse.book.similar_books.book;


        const finalArr = similarWorks.map(book => {
            let final = {};

            for (const key in book) {
                if (Object.keys(book[key]).length === 0) {
                    final[key] = "no data available"
                } else {
                    final[key] = book[key]
                }
            }
            return final
        })

        return {
            book: theBook,

            similar_books: finalArr.map(book => {
                return book
            })
        }
    }

    //  Books a User has Read TODO
    

    // Returns a list of Groups according to search query
    // Search Query must look like: goodreads-librarians-group

    async getGroupsByName(inputObject) {
        let queryString = inputObject.query;

        let formattedQuery = queryString.split(" ").join("-")

        return this.get(this.baseURL + `group/search.xml?key=${process.env.API_KEY}&q=${formattedQuery}`)
            .then(res => {
                return xmlParser.toJson(res);
            })
            .then(newJSON => {
                let body = JSON.parse(newJSON);

                const groupArray = body.GoodreadsResponse.groups.list.group.map(group => {
                    return _.mapValues(group, val => val.nil ? null : val)
                })

                return {
                    total: body.GoodreadsResponse.groups.list.total,
                    groups: groupArray.map(group => {
                        return {
                            id: group.id,
                            title: group.title,
                            access: group.access,
                            users_count: group.users_count,
                            image_url: group.image_url,
                            small_image_url: group.small_image_url,
                            last_activity_at: group.last_activity_at
                        }
                    })
                    
                }
            });
    }

    async getGroupById(inputObject) {
        let xmlResp = await this.get(this.baseURL + `group/show/${inputObject.groupId}.xml?key=${process.env.API_KEY}`)
        let resp = await xmlParser.toJson(xmlResp);
        let newJSON = JSON.parse(resp, (k, v) => v === "true" ? true : v === "false" ? false : v);
        let groupObj = newJSON.GoodreadsResponse.group

        console.log("")
        // console.log("CURENT READING ", groupObj.currently_reading.group_book)
        // console.log("")
        // console.log("GROUP BOOK ", groupObj.currently_reading.group_book.book)
        console.log("")


        return {
            id: groupObj.id,
            title: groupObj.title,
            description: groupObj.description,
            access: groupObj.access,
            location: groupObj.location,
            last_activity_at: groupObj.last_activity_at,
            display_folder_count: groupObj.display_folder_count,
            display_topics_per_folder: groupObj.display_topics_per_folder,
            bookshelves_public_flag: groupObj.bookshelves_public_flag,
            add_books_flag: groupObj.add_books_flag,
            add_events_flag: groupObj.add_events_flag,
            polls_flag: groupObj.polls_flag,
            discussion_public_flag: groupObj.discussion_public_flag,
            real_world_flag: groupObj.real_world_flag,
            accepting_new_members_flag: groupObj.accepting_new_members_flag,
            category: groupObj.category,
            subcategory: groupObj.subcategory,
            rules: groupObj.rules,
            link: groupObj.link,
            image_url: groupObj.image_url,
            group_users_count: groupObj.group_users_count,

            folders: groupObj.folders.folder.map(folder => {
                return {
                    id: folder.id,
                    name: folder.name,
                    items_count: folder.items_count,
                    sub_items_count: folder.sub_items_count,
                    updated_at: folder.updated_at
                }
            }),

            currently_reading: groupObj.currently_reading.group_book.map(g_book => {
                console.log(g_book.book)
                return {
                    id: g_book.id.$t,
                    updated_at: g_book.updated_at.$t,
                    start_reading_at: g_book.start_reading_at.$t,
                    finish_reading_at: g_book.finish_reading_at.$t,
                    book: {
                        id: g_book.book.id.$t,
                        title: g_book.book.title,
                        publication_year: g_book.book.publication_year.$t,
                        author: {
                            id: g_book.book.author.id.$t,
                            name: g_book.book.author.name,
                            user_id: g_book.book.author.user_id.$t
                        }

                    }
                }
            })

            
        }
        
    }

}

module.exports = GoodReadsAPI;
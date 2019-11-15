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

        const initBookArr = newJSON.GoodreadsResponse.author.books.book

        const finalArr = initBookArr.map(book => {
            return _.mapValues(book, val => val.nil ? null : val)
        })

        return {
            author: theAuthor,
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


}

module.exports = GoodReadsAPI;
const { RESTDataSource } = require('apollo-datasource-rest');
const xmlParser = require("xml2json");


class GoodReadsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://www.goodreads.com/api/';
    }

    // https://www.goodreads.com/api/author_url/Orson%20Scott%20Card?key=JA8x37btYafVM0F2slleVQ
    // https://www.goodreads.com/api/author_url/${args.name}?key=${process.env.API_KEY}

    async getAuthor(nameObject) {

        return this.get(this.baseURL + `author_url/${nameObject.name}?key=${process.env.API_KEY}`)
            .then(res => {
                return xmlParser.toJson(res);
            })
            .then(newJSON => {
                // console.log(newJSON)
                let body = JSON.parse(newJSON);
                return body.GoodreadsResponse.author
            });

    }
}

module.exports = GoodReadsAPI;
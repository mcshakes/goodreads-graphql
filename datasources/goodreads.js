const { RESTDataSource } = require('apollo-datasource-rest');

class GoodReadsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://www.goodreads.com/api/';
    }
    // https://www.goodreads.com/api/author_url/${args.name}?key=${process.env.API_KEY}

    async getAuthor(name) {
        return this.get(`author_url/${name}?key=${process.env.API_KEY}`);
    }
}

module.exports = GoodReadsAPI;
const { gql } = require('apollo-server');
const createTestServer = require("./helper")

const BOOK_DATA = gql`
    {

    }
`

describe("Queries", () => {

    test("author", async () => {
        const { query } = createTestServer({
            author: { name: "Tom Clancy" },

        })
    })
})
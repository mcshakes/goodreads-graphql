const resolvers = require("../resolvers");

describe("[Query.author]", () => {
    const mockContext = {
        dataSources: {
            goodreadsAPI: { getAuthor: jest.fn() }
        }
    };

    it("calls lookup from goodreads API", async () => {
        const getAuthorByName = mockContext.dataSources.goodreadsAPI.getAuthor;

        getAuthorByName.mockReturnValueOnce({
            name: "Tom Clancy",
            id: 23,
            link: "https://www.tom-clancy.com"
        });

        const res = await resolvers.Query.author(null, { name: "Tom Clancy" }, mockContext);
        expect(res).toEqual({ id: 23, name: "Tom Clancy", link: "https://www.tom-clancy.com" });

    })
})

describe("[Query.authorData]", () => {
    const mockContext = {
        dataSources: {
            goodreadsAPI: { getAuthorData: jest.fn() }
        }
    };

    it("looks up full author data based on ID", async () => {
        const getAuthorDataByID = mockContext.dataSources.goodreadsAPI.getAuthorData;

        getAuthorDataByID.mockReturnValueOnce({
            author: {
                name: "Bilbo Blaggins"
            },
            hometown: "Somewhere, Alabama",
            books: [
                {
                    id: "1234",
                    isbn: "04563112",
                    title: "A Ring Too Far"
                },
                {
                    id: "1234",
                    isbn: "04563112",
                    title: "A Ring Too Far"
                }

            ]
        })

        const res = await resolvers.Query.authorData(null, { id: 3389 }, mockContext);

        let responseObj = {
            author: {
                name: "Bilbo Blaggins"
            },
            hometown: "Somewhere, Alabama",
            books: [
                {
                    id: "1234",
                    isbn: "04563112",
                    title: "A Ring Too Far"
                },
                {
                    id: "1234",
                    isbn: "04563112",
                    title: "A Ring Too Far"
                }

            ]
        }
        expect(res).toEqual(responseObj);
    })
})
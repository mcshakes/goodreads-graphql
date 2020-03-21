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

        // expect(getAuthorByName).toBeCalledWith({ })
    })
})
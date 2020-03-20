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
            name: "Tom Clancy"
        });

        const res = await resolvers.Query.author(null, { name: "Tom Clancy" }, mockContext);
        expect(res).toEqual({ name: "Tom Clancy" });

        // expect(getAuthorByName).toBeCalledWith({ })
    })
})
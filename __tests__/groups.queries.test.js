const resolvers = require("../resolvers");

describe("[Query.groupsByName]", () => {
    const mockContext = {
        dataSources: {
            goodreadsAPI: { getGroupsByName: jest.fn() }
        }
    };

    it("looks up groups by name", async () => {
        const getGroupsByName = mockContext.dataSources.goodreadsAPI.getGroupsByName;

        getGroupsByName.mockReturnValueOnce([
            {
                name: "goodreads-librarians-group",
                id: 220,
                users_count: 116716
            }
        ]);

        const res = await resolvers.Query.groupsByName(null, { name: "goodreads-librarians-group" }, mockContext);


        let responseObj = [
            {
                name: "goodreads-librarians-group",
                id: 220,
                users_count: 116716
            }
        ]

        expect(res).toEqual(responseObj);
        expect(res).toMatchSnapshot();
    })
})

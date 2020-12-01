// const resolvers = require("../resolvers");

// describe("[Query.groupsByName]", () => {
//     const mockContext = {
//         dataSources: {
//             goodreadsAPI: { getGroupsByName: jest.fn() }
//         }
//     };

//     it("looks up groups by name", async () => {
//         // const getGroupsByName = mockContext.dataSources.goodreadsAPI.getGroupsByName;

//         // getGroupsByName.mockReturnValueOnce([
//         //     {
//         //         name: "goodreads-librarians-group",
//         //         id: 220,
//         //         users_count: 116716
//         //     }
//         // ]);

//         const res = await resolvers.Query.groupsByName(null, { name: "goodreads-librarians-group" }, mockContext);


//         // let responseObj = [
//         //     {
//         //         name: "goodreads-librarians-group",
//         //         id: 220,
//         //         users_count: 116716
//         //     }
//         // ]

//         expect(res).toEqual(responseObj);
//     })
// })

import { createTestClient } from 'apollo-server-testing';
import { createTestServer } from "./createTestServer";

export const runTestCases = (
    groupName,
    testCases
) => {

    const { query } = createTestClient(createTestServer());

    describe(`${groupName} resolvers`, () => {
        for (let testCase of testCases) {
            it(testCase.id, async() => {
                const res = await query({
                    query: testCase.query,
                    variables: testCase.variables || {},
                });

                expect(res).toMatchSnapshot();
            }) 
        }
    })
}
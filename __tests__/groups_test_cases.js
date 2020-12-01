import { runTestCases } from "./groups.resolvers.runner.test";

const testCases = [
    {
        id: "groupsByName",
        query: `
            query ($query: String) {
                groupsByName (query: $query) {
                    total
                    groups {
                        id
                        title
                    }
                }
            }
        `,
        variables: {
            query: "goodreads librarian group"
        }
    }
]

runTestCases("Groups", testCases);
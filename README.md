# goodreads-graphql

Motivation: Trying to bring some semblance of order and usability to the Goodreads API by wrapping it with GraphQL and treating the original REST API as a datasource.

Feel free to use it, fork it, or play with it alongside your Goodreads REST queries. Do let me know any suggestions to improve or problems that creep up.

## Endpoints Available:

1) **author** queries `https://www.goodreads.com/api/author_url/{author_name}?key={api_key}`

2) **authorData** queries `https://www.goodreads.com/author/show/{author_id}?format=xml&?key={api_key}`. 
    *USAGE*: *Get the Author ID from previous call*

3) **bookData** calls `https://www.goodreads.com/book/show/{book_id}?format=xml?key={api_key}` 
    *USAGE*: *Book ID can be found in previous call*

4) **groupsByName** calls `https://www.goodreads.com/group/search.xml?key={api_key}&q={search_query}`. 
    *USAGE*: *Group names have dashes as delimeter like goodreads-librarians-group. However, just type "goodreads librarians group"*


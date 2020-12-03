const resolvers = require("../resolvers");

const responseObject = {
    "data": {
      "bookData": {
        "id": "8908",
        "title": "World War Z: An Oral History of the Zombie War",
        "isbn": "0307346609",
        "num_pages": "342",
        "description": "The Zombie War came unthinkably close to eradicating humanity. Max Brooks, driven by the urgency of preserving the acid-etched first-hand experiences of the survivors from those apocalyptic years, traveled across the United States of America and throughout the world, from decimated cities that once teemed with upwards of thirty million souls to the most remote and inhospitable areas of the planet. He recorded the testimony of men, women, and sometimes children who came face-to-face with the living, or at least the undead, hell of that dreadful time. World War Z is the result. Never before have we had access to a document that so powerfully conveys the depth of fear and horror, and also the ineradicable spirit of resistance, that gripped human society through the plague years.<br /><br />Ranging from the now infamous village of New Dachang in the United Federation of China, where the epidemiological trail began with the twelve-year-old Patient Zero, to the unnamed northern forests where untold numbers sought a terrible and temporary refuge in the cold, to the United States of Southern Africa, where the Redeker Plan provided hope for humanity at an unspeakable price, to the west-of-the-Rockies redoubt where the North American tide finally started to turn, this invaluable chronicle reflects the full scope and duration of the Zombie War.<br /><br />Most of all, the book captures with haunting immediacy the human dimension of this epochal event. Facing the often raw and vivid nature of these personal accounts requires a degree of courage on the part of the reader, but the effort is invaluable because, as Mr. Brooks says in his introduction, \"By excluding the human factor, aren't we risking the kind of personal detachment from history that may, heaven forbid, lead us one day to repeat it? And in the end, isn't the human factor the only true difference between us and the enemy we now refer to as 'the living dead'?\"<br /><br />Note: Some of the numerical and factual material contained in this edition was previously published under the auspices of the United Nations Postwar Commission.",
        "publisher": "Crown",
        "average_rating": "4.01",
        "ratings_count": "400468",
        "text_reviews_count": "21495",
        "publication_year": "2006",
        "is_ebook": false,
        "language_code": "eng",
        "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1528312647l/8908._SX50_.jpg",
        "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1528312647l/8908._SX98_.jpg",
        "similar_books": [
          {
            "id": "830502",
            "num_pages": "1116",
            "title": "It"
          },
          {
            "id": "149267",
            "num_pages": "1153",
            "title": "The Stand"
          },
          {
            "id": "11588",
            "num_pages": "659",
            "title": "The Shining"
          },
          {
            "id": "43763",
            "num_pages": "342",
            "title": "Interview with the Vampire (The Vampire Chronicles, #1)"
          },
          {
            "id": "40604658",
            "num_pages": "466",
            "title": "Jurassic Park (Jurassic Park, #1)"
          },
          {
            "id": "18007564",
            "num_pages": "384",
            "title": "The Martian"
          },
          {
            "id": "179780",
            "num_pages": "385",
            "title": "The Exorcist"
          },
          {
            "id": "10592",
            "num_pages": "253",
            "title": "Carrie"
          },
          {
            "id": "547094",
            "num_pages": "317",
            "title": "I Am Legend and Other Stories"
          },
          {
            "id": "40940649",
            "num_pages": "162",
            "title": "I Am Legend"
          },
          {
            "id": "33124137",
            "num_pages": "580",
            "title": "Pet Sematary"
          },
          {
            "id": "11590",
            "num_pages": "483",
            "title": "'Salem's Lot"
          },
          {
            "id": "6288",
            "num_pages": "241",
            "title": "The Road"
          },
          {
            "id": "10614",
            "num_pages": "370",
            "title": "Misery"
          },
          {
            "id": "375802",
            "num_pages": "324",
            "title": "Ender's Game (Ender's Saga, #1)"
          },
          {
            "id": "10603",
            "num_pages": "432",
            "title": "Cujo"
          },
          {
            "id": "17245",
            "num_pages": "488",
            "title": "Dracula"
          },
          {
            "id": "9969571",
            "num_pages": "374",
            "title": "Ready Player One (Ready Player One, #1)"
          }
        ]
      }
    }
  }

describe("[Query.bookData]", () => {
    const mockContext = {
        dataSources: {
            goodreadsAPI: { getInfoForBook: jest.fn() }
        }
    };

    it("looks up groups by name", async () => {
        const getInfoForBook = mockContext.dataSources.goodreadsAPI.getInfoForBook;

        getInfoForBook.mockReturnValueOnce(responseObject);

        const res = await resolvers.Query.bookData(null, { id: "8908" }, mockContext);


        let responseObj = responseObject;

        expect(res).toEqual(responseObj);
        expect(res).toMatchSnapshot();
    })
})

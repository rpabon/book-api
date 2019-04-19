import axios from 'axios';
import dotenv from 'dotenv';
import { getTraversalObj, convertToJson } from 'fast-xml-parser';
import { xmlParserOptions } from './constants';

dotenv.config();

const { BASE_URL, API_KEY } = process.env;

export const bookList = (req, res) => {
  const query = req.query.q;

  axios
    .get(`${BASE_URL}/search?key=${API_KEY}&q=${query}`)
    .then(({ data }) => {
      const tObj = getTraversalObj(data, xmlParserOptions);
      const jsonObj = convertToJson(tObj, xmlParserOptions);
      const books = jsonObj.GoodreadsResponse.search.results.work.map(
        ({ best_book, original_publication_year, average_rating }) => ({
          id: best_book.id,
          url: best_book.image_url,
          url_small: best_book.small_image_url,
          title: (best_book.title || '').replace(/ *\([^)]*\) */g, ''),
          author: best_book.author.name,
          author_id: best_book.author.id,
          year: original_publication_year,
          rating: average_rating
        })
      );

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ books }));
    })
    .catch(error => console.log(error));
};

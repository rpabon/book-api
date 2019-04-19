import axios from 'axios';
import dotenv from 'dotenv';
import { xmlParserOptions } from './constants';
import { getTraversalObj, convertToJson } from 'fast-xml-parser';

dotenv.config();

const { BASE_URL, API_KEY } = process.env;
const parseBook = ({
  id,
  title = {},
  title_without_series,
  isbn,
  image_url,
  small_image_url,
  publication_year,
  description,
  average_rating,
  num_pages,
  authors: { author = {} },
  similar_books,
  work = {}
}) => ({
  id,
  title: work.original_title || title.__cdata || title || title_without_series,
  year: work.original_publication_year || publication_year,
  rating: average_rating,
  ...(image_url && { image_url: image_url.__cdata || image_url }),
  ...(small_image_url && {
    small_image_url: small_image_url.__cdata || small_image_url
  }),
  ...(isbn && isbn.__cdata && { isbn: Number(isbn.__cdata) }),
  ...(description &&
    description.__cdata && { description: description.__cdata }),
  ...(num_pages &&
    num_pages.__cdata && { num_pages: Number(num_pages.__cdata) }),
  ...(author.id && { author_id: Number(author.id) }),
  ...(author.name && { author: author.name }),
  ...(author.image_url &&
    author.image_url.__cdata && { author_image_url: author.image_url.__cdata }),
  ...(similar_books &&
    Array.isArray(similar_books.book) && {
      similar_books: similar_books.book.map(b => parseBook(b))
    })
});

export const bookSingle = (req, res) => {
  const id = req.query.id;

  axios
    .get(`${BASE_URL}/book/show/${id}?key=${API_KEY}`)
    .then(({ data }) => {
      const tObj = getTraversalObj(data, xmlParserOptions);
      const jsonObj = convertToJson(tObj, xmlParserOptions);
      const book = parseBook(jsonObj.GoodreadsResponse.book);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ book }));
    })
    .catch(error => console.log(error));
};

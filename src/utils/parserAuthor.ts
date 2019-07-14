import { GoodreadsAuthor } from '../models/GoodreadsAuthor';
import { Author } from '../models/Author';
import { Book } from '../models/Book';
import { getCdata } from './getCdata';
import { parseBook } from './parseBook';

export function parseAuthor(author: GoodreadsAuthor): Author {
  return {
    id: author.id,
    large_image_url: getCdata(author.large_image_url),
    image_url: getCdata(author.image_url),
    small_image_url: getCdata(author.small_image_url),
    about: getCdata(author.about),
    hometown: author.hometown,
    born_at: author.born_at,
    died_at: author.died_at,
    books: getBooks(author)
  };
}

function getBooks(author: GoodreadsAuthor): Book[] {
  try {
    author.books.book.map(book => parseBook(book));
  } catch (error) {
    return [];
  }
}

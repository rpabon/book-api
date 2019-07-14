import { getCdata } from './getCdata';
import { GoodreadsBook } from '../models/GoodreadsBook';
import { Book } from '../models/Book';

export function parseBook(book: GoodreadsBook): Book {
  return {
    id: book.id,
    author: getAuthorName(book),
    author_id: getAuthorId(book),
    author_image_url: getAuthorImageURL(book),
    title: getTitle(book),
    rating: book.average_rating,
    image_url: getCdata(book.image_url),
    small_image_url: getCdata(book.small_image_url),
    isbn: Number(getCdata(book.isbn)),
    description: getCdata(book.description),
    num_pages: Number(getCdata(book.num_pages)),
    similar_books: getSimilarBooks(book),
    year: getYear(book)
  };
}

function getAuthorId(book: GoodreadsBook): number {
  try {
    return Number(book.authors.author.id);
  } catch (error) {
    return 0;
  }
}

function getAuthorName(book: GoodreadsBook): string {
  try {
    return book.authors.author.name;
  } catch (error) {
    return '';
  }
}

function getAuthorImageURL(book: GoodreadsBook): string {
  try {
    return book.authors.author.image_url;
  } catch (error) {
    return '';
  }
}

function getTitle(book: GoodreadsBook): string {
  const { work, title, title_without_series } = book;

  return (
    (work && work.original_title) || getCdata(title) || title_without_series
  );
}

function getYear(book: GoodreadsBook): number {
  const { work, publication_year } = book;

  return (work && work.original_publication_year) || publication_year;
}

function getSimilarBooks(book: GoodreadsBook): Book[] {
  try {
    book.similar_books.book.map(b => parseBook(b));
  } catch (error) {
    return [];
  }
}

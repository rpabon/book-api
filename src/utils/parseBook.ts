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
    rating: book.average_rating || 0,
    image_url: getCdata(book.image_url),
    small_image_url: getCdata(book.small_image_url),
    isbn: Number(getCdata(book.isbn)),
    description: getCdata(book.description),
    num_pages: Number(getCdata(book.num_pages)),
    similar_books: getSimilarBooks(book),
    year: getYear(book),
  };
}

function getAuthorId({ authors }: GoodreadsBook): number {
  try {
    const { author } = authors;
    const id = Array.isArray(author) ? author[0].id : author.id;

    return Number(id) || 0;
  } catch (error) {
    return 0;
  }
}

function getAuthorName({ authors }: GoodreadsBook): string {
  try {
    const { author } = authors;
    const name = Array.isArray(author) ? author[0].name : author.name;

    return name || '';
  } catch (error) {
    return '';
  }
}

function getAuthorImageURL({ authors }: GoodreadsBook): string {
  try {
    const { author } = authors;
    const image = Array.isArray(author)
      ? author[0].image_url
      : author.image_url;

    return getCdata(image);
  } catch (error) {
    return '';
  }
}

function getTitle(book: GoodreadsBook): string {
  const { work, title, title_without_series } = book;

  return (
    (work && work.original_title) ||
    getCdata(title) ||
    title_without_series ||
    title
  );
}

function getYear(book: GoodreadsBook): number {
  const { work, publication_year } = book;

  return (work && work.original_publication_year) || publication_year || 0;
}

function getSimilarBooks(book: GoodreadsBook): Book[] {
  try {
    return book.similar_books.book.map((b) => parseBook(b));
  } catch (error) {
    return [];
  }
}

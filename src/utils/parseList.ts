import { SearchResponse } from '../models/SearchResponse';
import { GoodreadsBookInfo } from '../models/GoodreadsBookInfo';
import { GoodreadsBestBook } from '../models/GoodreadsBestBook';
import { BookInfo } from '../models/BookInfo';

export function parseList({ results }: SearchResponse): BookInfo[] {
  const bookList = results && Array.isArray(results.work) ? results.work : [];

  return bookList.map((book: GoodreadsBookInfo) => {
    const bestBook = book.best_book || ({} as GoodreadsBestBook);
    const { id, image_url, small_image_url, title, author } = bestBook;

    return {
      id,
      author: author && author.name,
      author_id: author && author.id,
      title: (title || '').replace(/ *\([^)]*\) */g, ''),
      url: image_url,
      url_small: small_image_url,
      rating: book.average_rating,
      year: book.original_publication_year
    };
  });
}

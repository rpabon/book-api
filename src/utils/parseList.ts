import { SearchResponse } from '../models/SearchResponse';
import { GoodreadsBookInfo } from '../models/GoodreadsBookInfo';
import { GoodreadsBestBook } from '../models/GoodreadsBestBook';
import { BookInfo } from '../models/BookInfo';

export function parseList({ results }: SearchResponse): BookInfo[] {
  try {
    return results.work.map(parseBookInfo);
  } catch (error) {
    return [];
  }
}

function parseBookInfo(bookInfo: GoodreadsBookInfo): BookInfo {
  const bestBook = bookInfo.best_book || ({} as GoodreadsBestBook);
  const { id, image_url, small_image_url, title, author } = bestBook;

  return {
    id,
    author: author && author.name,
    author_id: author && author.id,
    title: (title || '').replace(/ *\([^)]*\) */g, ''),
    url: image_url,
    url_small: small_image_url,
    rating: bookInfo.average_rating,
    year: bookInfo.original_publication_year
  };
}

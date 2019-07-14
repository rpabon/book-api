import { GoodreadsBestBook } from './GoodreadsBestBook';

export interface GoodreadsBookInfo {
  id: number;
  books_count: number;
  ratings_count: number;
  text_reviews_count: number;
  original_publication_year: number;
  original_publication_month: number;
  original_publication_day: number;
  average_rating: number;
  best_book: GoodreadsBestBook;
}

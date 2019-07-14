import { SearchResponse } from './SearchResponse';
import { GoodreadsAuthor } from './GoodreadsAuthor';
import { GoodreadsBook } from './GoodreadsBook';

export interface ResponseCriteria {
  search: SearchResponse;
  author: GoodreadsAuthor;
  book: GoodreadsBook;
}

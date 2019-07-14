import { GoodreadsAuthorInfo } from './GoodreadsAuthorInfo';
import { GoodreadsBook } from './GoodreadsBook';

export interface GoodreadsAuthor extends GoodreadsAuthorInfo {
  large_image_url: string;
  small_image_url: string;
  about: string;
  hometown: string;
  born_at: string;
  died_at: string;
  books: {
    book: GoodreadsBook[];
  };
}

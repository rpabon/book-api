import { GoodreadsAuthorInfo } from './GoodreadsAuthorInfo';
import { Cdata } from './Cdata';

export interface GoodreadsBook {
  id: number;
  title: string;
  title_without_series: string;
  link: Cdata | string;
  small_image_url: Cdata | string;
  image_url: Cdata | string;
  num_pages: number;
  isbn: Cdata | number;
  isbn13: number;
  average_rating: number;
  ratings_count: number;
  publication_year: number;
  publication_month: number;
  publication_day: number;
  description: Cdata | string;
  similar_books: {
    book: GoodreadsBook[];
  };
  authors: {
    author: GoodreadsAuthorInfo[] | GoodreadsAuthorInfo;
  };
  work: {
    id: number;
    original_title: string;
    original_publication_year: number;
  };
}

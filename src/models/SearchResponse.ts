import { GoodreadsBookInfo } from './GoodreadsBookInfo';

export interface SearchResponse {
  results: {
    work: GoodreadsBookInfo[];
  };
}

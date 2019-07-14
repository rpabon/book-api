import { ResponseCriteria } from './ResponseCriteria';

export interface GoodreadsResponse {
  GoodreadsResponse: { [P in keyof ResponseCriteria]: ResponseCriteria[P] };
}

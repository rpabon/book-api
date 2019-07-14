import { SearchResponse } from './SearchResponse';
import { GoodreadsAuthor } from './GoodreadsAuthor';
import { GoodreadsBook } from './GoodreadsBook';
import { ParsedData } from './ParsedData';

export type ParseFunction = (
  arg: SearchResponse | GoodreadsBook | GoodreadsAuthor
) => ParsedData;

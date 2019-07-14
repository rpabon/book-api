import { Book } from './Book';

export interface Author {
  id: number;
  large_image_url: string;
  image_url: string;
  small_image_url: string;
  about: string;
  hometown: string;
  born_at: string;
  died_at: string;
  books: Book[];
}

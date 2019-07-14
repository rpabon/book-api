import { GoodreadsAuthorInfo } from './GoodreadsAuthorInfo';

export interface GoodreadsBestBook {
  id: number;
  title: string;
  author: GoodreadsAuthorInfo;
  image_url: string;
  small_image_url: string;
}

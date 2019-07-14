export interface Book {
  id: number;
  author_id: number;
  author: string;
  title: string;
  rating: number;
  image_url: string;
  small_image_url: string;
  isbn: number;
  description: string;
  num_pages: number;
  author_image_url: string;
  similar_books: Book[];
  year: number;
}

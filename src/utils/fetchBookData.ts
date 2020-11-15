import { fetchData } from './fetchData';
import { parseBook } from './parseBook';

export async function fetchBookData(id: string) {
  const urlSuffix = `book/show/${id}`;
  const { book } = await fetchData(urlSuffix);

  return parseBook(book);
}

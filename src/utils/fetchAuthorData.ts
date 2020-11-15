import { fetchData } from './fetchData';
import { parseAuthor } from './parserAuthor';

export async function fetchAuthorData(id: string) {
  const urlSuffix = `author/show/${id}`;
  const { author } = await fetchData(urlSuffix);

  return parseAuthor(author);
}

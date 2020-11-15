import { fetchData } from './fetchData';
import { parseList } from './parseList';

export async function fetchSearchData(q: string) {
  const urlSuffix = `search${q ? `?q=${q}` : ''}`;
  const { search } = await fetchData(urlSuffix);

  return parseList(search);
}

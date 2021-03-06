import axios, { AxiosResponse } from 'axios';
import { ResponseCriteria } from '../models/ResponseCriteria';
import { getEnvironmentVariables } from './getEnvironmentVariables';
import { xmlToJson } from './xmlToJson';

function generateURL(suffix: string): string {
  const { BASE_URL, API_KEY } = getEnvironmentVariables();
  const joiner = suffix.indexOf('?') > -1 ? '&' : '?';

  return `${BASE_URL}/${suffix}${joiner}key=${API_KEY}`;
}

export async function fetchData(
  urlSuffix: string
): Promise<Partial<ResponseCriteria>> {
  const { data: xmlData }: AxiosResponse<string> = await axios.get(
    generateURL(urlSuffix)
  );

  return xmlToJson(xmlData);
}

import { Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { SearchCriteria } from '../models/SearchCriteria';
import { ParseFunction } from '../models/PaseFunction';
import { getEnvironmentVariables } from './getEnvironmentVariables';
import { xmlToJson } from './xmlToJson';
import { sendSuccessResponse, sendErrorResponse } from './sendResponse';

export async function fetchData(
  urlSuffix: string,
  searchCriterion: SearchCriteria,
  parseFunction: ParseFunction,
  res: Response
) {
  try {
    const { data: xmlData }: AxiosResponse<string> = await axios.get(
      generateURL(urlSuffix)
    );
    const responseCriteria = xmlToJson(xmlData);
    const parsedData = parseFunction(responseCriteria[searchCriterion]);

    sendSuccessResponse(res, { [searchCriterion]: parsedData });
  } catch (error) {
    sendErrorResponse(res, error);
  }
}

function generateURL(suffix: string): string {
  const { BASE_URL, API_KEY } = getEnvironmentVariables();
  const joiner = suffix.indexOf('?') > -1 ? '&' : '?';

  return `${BASE_URL}/${suffix}${joiner}key=${API_KEY}`;
}

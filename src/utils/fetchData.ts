import { Response } from 'express';
import { SearchCriteria } from '../models/SearchCriteria';
import { ParseFunction } from '../models/PaseFunction';
import { sendSuccessResponse, sendErrorResponse } from './sendResponse';
import { getResponseCriterion } from './getResponseCriterion';

export async function fetchData(
  urlSuffix: string,
  searchCriterion: SearchCriteria,
  parseFunction: ParseFunction,
  res: Response
) {
  try {
    const responseCriterion = await getResponseCriterion(urlSuffix);
    const parsedData = parseFunction(responseCriterion[searchCriterion]);

    sendSuccessResponse(res, { [searchCriterion]: parsedData });
  } catch (error) {
    sendErrorResponse(res, error);
  }
}

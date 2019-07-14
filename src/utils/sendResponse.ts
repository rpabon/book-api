import { Response } from 'express';
import { SearchCriteria } from '../models/SearchCriteria';
import { ParsedData } from '../models/ParsedData';

export function sendSuccessResponse(
  res: Response,
  parsedData: ResponseParseData
) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(parsedData));
}

export function sendErrorResponse(res: Response, error: Error) {
  res.status(400).send({ message: error });
}

type ResponseParseData = { [criterion in SearchCriteria]?: ParsedData };

import { Response } from 'express';
import { SearchCriteria } from '../models/SearchCriteria';

export function sendSuccessResponse<T>(
  searchCriterion: SearchCriteria,
  responseData: T,
  res: Response
): void {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ [searchCriterion]: responseData }));
}

export function sendFailureResponse(error: Error, res: Response): void {
  res.status(400).send({ message: error });
}

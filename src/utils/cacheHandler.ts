import { NextFunction, Request, Response } from 'express';
import { RedisClient } from 'redis';
import { SearchCriteria } from '../models/SearchCriteria';
import { getRedisKey } from './redis';
import { sendSuccessResponse } from './sendResponse';

export function cacheHandler(
  searchCriteria: SearchCriteria,
  redisClient: RedisClient
) {
  return (req: Request, res: Response, next: NextFunction) => {
    redisClient.get(getRedisKey(req), (error, data) => {
      if (error) {
        throw error;
      }

      if (data !== null) {
        const parsedData = JSON.parse(data);
        sendSuccessResponse(searchCriteria, parsedData, res);
      } else {
        next();
      }
    });
  };
}

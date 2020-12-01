import { NextFunction, Request, Response } from 'express';
import { RedisClient } from 'redis';
import { SearchCriteria } from '../models/SearchCriteria';
import { getRedisKey, getRedisData } from './redis';
import { sendSuccessResponse } from './sendResponse';

export function cacheHandler(
  searchCriteria: SearchCriteria,
  redisClient: RedisClient
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = getRedisKey(req);
      const parsedData = await getRedisData(redisClient, key);

      if (parsedData !== null) {
        sendSuccessResponse(searchCriteria, parsedData, res);
      } else {
        next();
      }
    } catch (error) {
      console.error(error);
    }
  };
}

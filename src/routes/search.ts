import { Request, Response } from 'express';
import { RedisClient } from 'redis';
import { fetchSearchData } from '../utils/fetchSearchData';
import { setRedisKey } from '../utils/redis';
import {
  sendFailureResponse,
  sendSuccessResponse,
} from '../utils/sendResponse';

export function search(redisClient: RedisClient) {
  return async (req: Request, res: Response) => {
    try {
      const bookInfos = await fetchSearchData(req.query.q as string);

      setRedisKey(redisClient, req, bookInfos);
      sendSuccessResponse('search', bookInfos, res);
    } catch (error) {
      sendFailureResponse(error, res);
    }
  };
}

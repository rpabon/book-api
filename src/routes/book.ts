import { Request, Response } from 'express';
import { RedisClient } from 'redis';
import { fetchBookData } from '../utils/fetchBookData';
import { setRedisKey } from '../utils/redis';
import {
  sendSuccessResponse,
  sendFailureResponse,
} from '../utils/sendResponse';

export function book(redisClient: RedisClient) {
  return async (req: Request, res: Response) => {
    try {
      const bookRes = await fetchBookData(req.params.id);

      setRedisKey(redisClient, req, bookRes);
      sendSuccessResponse('book', bookRes, res);
    } catch (error) {
      sendFailureResponse(error, res);
    }
  };
}

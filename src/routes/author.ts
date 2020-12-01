import { Request, Response } from 'express';
import { RedisClient } from 'redis';
import { fetchAuthorData } from '../utils/fetchAuthorData';
import { setRedisKey } from '../utils/redis';
import {
  sendFailureResponse,
  sendSuccessResponse,
} from '../utils/sendResponse';

export function author(redisClient: RedisClient) {
  return async (req: Request, res: Response) => {
    try {
      const authorRes = await fetchAuthorData(req.params.id);

      setRedisKey(redisClient, req, authorRes);
      sendSuccessResponse('author', authorRes, res);
    } catch (error) {
      sendFailureResponse(error, res);
    }
  };
}

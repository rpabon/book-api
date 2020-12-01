import { Request } from 'express';
import { RedisClient } from 'redis';

const CACHE_EXPIRATION = 3600;

export function getRedisKey(req: Request): string {
  const query = req.query.q as string;
  const { id } = req.params;

  if (query) {
    return `query-${query.replace(' ', '')}`;
  }

  if (id) {
    return id;
  }

  return '';
}

export function setRedisKey<T>(
  redisClient: RedisClient,
  req: Request,
  data: T
): void {
  redisClient.setex(getRedisKey(req), CACHE_EXPIRATION, JSON.stringify(data));
}

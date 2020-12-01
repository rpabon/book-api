import { promisify } from 'util';
import { Request } from 'express';
import { RedisClient } from 'redis';

const CACHE_EXPIRATION = 3600;

export function getRedisKeyFromQuery(query: string) {
  return `query-${query.replace(' ', '')}`;
}

export function getRedisKey(req: Request): string {
  const query = req.query.q as string;
  const { id } = req.params;

  if (query) {
    return getRedisKeyFromQuery(query);
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

export async function getRedisData<T>(client: RedisClient, key: string) {
  const getAsync = promisify(client.get).bind(client);

  try {
    const data = await getAsync(key);

    return JSON.parse(data) as T;
  } catch (error) {
    throw error;
  }
}

export async function redisResolver<T>(
  client: RedisClient,
  callback: (key: string) => Promise<T>,
  key: string,
  query?: string
): Promise<T> {
  try {
    let res = await getRedisData<T>(client, key);

    if (res !== null) {
      return res;
    } else {
      res = await callback(query || key);

      return res;
    }
  } catch (error) {
    return null;
  }
}

export async function redisQueryResolver<T>(
  client: RedisClient,
  callback: (key: string) => Promise<T>,
  query: string
) {
  const key = getRedisKeyFromQuery(query);
  const res = await redisResolver(client, callback, key, query);

  return res;
}

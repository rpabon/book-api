import * as dotenv from 'dotenv';

dotenv.config();

const { BASE_URL, API_KEY, PORT, REDIS_URL } = process.env;

export function getEnvironmentVariables() {
  return {
    BASE_URL,
    API_KEY,
    REDIS_URL,
    PORT: Number(PORT) || 3000,
  };
}

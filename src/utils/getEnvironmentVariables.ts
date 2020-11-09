import * as dotenv from 'dotenv';
import { EnvironmentVariables } from '../models/EnvironmentVariables';

dotenv.config();

const { BASE_URL, API_KEY, PORT } = process.env;

export function getEnvironmentVariables(): EnvironmentVariables {
  return {
    BASE_URL: BASE_URL || '',
    API_KEY: API_KEY || '',
    SERVER_PORT: Number(PORT) || 3000,
  };
}

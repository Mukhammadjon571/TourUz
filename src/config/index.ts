import { Config } from './types';
import { config as dotenv } from 'dotenv';

dotenv();

const config: Config = {
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
  server: {
    host: process.env.APP_HOST,
    port: parseInt(process.env.SERVER_PORT),
    env: process.env.NODE_ENV,
  },
  authToken: {
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
  awsService: {
    name: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_BUCKET_REGION,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    url:process.env.AWS_URL
  },
};

export default config;

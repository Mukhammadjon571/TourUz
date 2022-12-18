import type { knex, Knex } from 'knex';
import config from './src/config';

const { postgres } = config;

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: postgres.database,
      user: postgres.user,
      password: postgres.password,
      host: postgres.host,
      port: postgres.port,
    },
    pool: {
      min: 2,
      max: 30,
    },
    migrations: {
      tableName: 'migrations',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      database: postgres.database,
      user: postgres.user,
      password: postgres.password,
      host: postgres.host,
      port: postgres.port,
    },
    pool: {
      min: 2,
      max: 30,
    },
    migrations: {
      tableName: 'migrations',
    },
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: postgres.database,
      user: postgres.user,
      password: postgres.password,
      host: postgres.host,
      port: postgres.port,
    },
    pool: {
      min: 2,
      max: 30,
    },
    migrations: {
      tableName: 'migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: postgres.database,
      user: postgres.user,
      password: postgres.password,
      host: postgres.host,
      port: postgres.port,
    },
    pool: {
      min: 2,
      max: 30,
    },
    migrations: {
      tableName: 'migrations',
    },
  },
};

export default knexConfig;

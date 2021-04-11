import * as dotenv from 'dotenv';

import appConfig from './app.json';

dotenv.config({ path: './src/.env' });
dotenv.config({ path: './src/pg.env' });

const { POSTGRES_DB, DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, DB_TEST_USER, DB_TEST_PASSWORD, JWT_KEY } = process.env;

const { dbPort, serverPort } = appConfig;

const isDev = () => process.env.NODE_ENV !== 'production';

export = {
	serverPort: serverPort,
	dbPort: dbPort,
	host: isDev() ? 'localhost' : 'db',
	username: isDev() ? DB_TEST_USER : POSTGRES_USER,
	password: isDev() ? DB_TEST_PASSWORD : POSTGRES_PASSWORD,
	database: isDev() ? DB_TEST : POSTGRES_DB,
	rootDir: isDev() ? './src' : './build',
	jwtSecretKey: JWT_KEY || 'secret',
};

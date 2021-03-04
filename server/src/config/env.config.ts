import * as dotenv from 'dotenv';

import { isDev } from '../utils';
import appConfig from './app.json';

dotenv.config({ path: '.env' });
dotenv.config({ path: 'pg.env' });

export default function envConfig() {
	const {
		POSTGRES_DB,
		DB_TEST,
		POSTGRES_USER,
		POSTGRES_PASSWORD,
		DB_TEST_USER,
		DB_TEST_PASSWORD,
		JWT_KEY,
	} = process.env;

	const { dbPort, serverPort } = appConfig;
	const common = {
		serverPort: serverPort,
		dbPort: dbPort,
	};
	if (isDev()) {
		return {
			...common,
			host: 'localhost',
			username: DB_TEST_USER,
			password: DB_TEST_PASSWORD,
			database: DB_TEST,
			rootDir: './src',
			jwtSecretKey: JWT_KEY || 'secret',
		};
	}

	return {
		...common,
		host: 'db',
		username: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		database: POSTGRES_DB,
		rootDir: './build',
		jwtSecretKey: JWT_KEY || 'secret',
	};
}

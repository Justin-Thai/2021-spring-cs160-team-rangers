import * as dotenv from 'dotenv';

import { isDev } from '../utils';

dotenv.config({ path: '.env' });
dotenv.config({ path: 'pg.env' });

export default function envConfig() {
	const {
		SERVER_PORT,
		DB_PORT,
		POSTGRES_DB,
		DB_TEST,
		POSTGRES_USER,
		POSTGRES_PASSWORD,
		DB_TEST_USER,
		DB_TEST_PASSWORD,
		JWT_KEY
	} = process.env;
	if (isDev()) {
		return {
			host: 'localhost',
			serverPort: Number.parseInt(SERVER_PORT!) || 5000,
			dbPort: Number.parseInt(DB_PORT!) || 5432,
			username: DB_TEST_USER,
			password: DB_TEST_PASSWORD,
			database: DB_TEST,
			rootDir: './src',
			jwtSecretKey: JWT_KEY || 'secret',
		};
	}

	return {
		host: 'postgres',
		serverPort: Number.parseInt(SERVER_PORT!) || 5000,
		dbPort: Number.parseInt(DB_PORT!) || 5432,
		username: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		database: POSTGRES_DB,
		rootDir: './build',
		jwtSecretKey: JWT_KEY || 'secret',
	};
}

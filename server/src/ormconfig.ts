import { envConfig } from './config';

const { host, dbPort, username, password, database, rootDir } = envConfig;

export = {
	type: 'postgres',
	host,
	port: dbPort,
	username,
	password,
	database,
	synchronize: false,
	logging: false,
	entities: [rootDir + '/database/entity/**/*.{js,ts}'],
	migrations: [rootDir + '/database/migration/**/*.{js,ts}'],
	subscribers: [rootDir + '/database/subscriber/**/*.{js,ts}'],
	cli: {
		migrationsDir: rootDir + '/database/migration',
	},
};

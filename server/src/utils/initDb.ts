import { createDatabase } from 'pg-god';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';

import pgConfig from '../ormconfig';

export default async function initDb(): Promise<Connection> {
	try {
		return await createConnection(pgConfig as ConnectionOptions);
	} catch (err) {
		const { database, username, password, port, host } = pgConfig;
		if (err.code === '3D000') {
			await createDatabase(
				{ databaseName: database as string },
				{
					user: username,
					port,
					host,
					password: password,
				}
			);
			return initDb();
		}
		throw err;
	}
}

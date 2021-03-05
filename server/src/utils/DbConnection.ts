import { getConnection } from 'typeorm';

import initDb from './initDb';

export default class DbConnection {
	async create() {
		return await initDb();
	}

	async clear() {
		const connection = getConnection();
		const entities = connection.entityMetadatas;

		entities.forEach(async (entity) => {
			const repository = connection.getRepository(entity.name);
			await repository.query(`DELETE FROM ${entity.tableName}`);
		});
	}

	async close() {
		await getConnection().close();
	}
}

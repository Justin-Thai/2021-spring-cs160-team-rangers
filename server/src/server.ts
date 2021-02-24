import 'reflect-metadata';
import express from 'express';
import { Server } from 'typescript-rest';
import { createConnection } from 'typeorm';
import fs from 'fs';
import path from 'path';

import { envConfig } from './config';
import './handlers';
import pgConfig from './ormconfig';
import { isDev } from './utils';

const { serverPort } = envConfig();

const app = express();
Server.buildServices(app);

createConnection(pgConfig)
	.then(async (connection) => {
		if (isDev()) {
			try {
				const initDb = fs.readFileSync(path.resolve(__dirname, './database/init.sql')).toString();
				await connection.query(initDb);
			} catch (err) {
				console.error('Unable to initialize tables', err);
			}
		}

		app.listen(serverPort, '0.0.0.0', () => {
			console.log(`⚡️[server]: Server is running at port ${serverPort}`);
		});
	})
	.catch((err) => console.log(err));

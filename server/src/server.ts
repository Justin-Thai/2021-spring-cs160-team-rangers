import 'reflect-metadata';
import express from 'express';
import { Server } from 'typescript-rest';
import { createConnection } from 'typeorm';
import fs from 'fs';
import path from 'path';

import { envConfig } from './config';
import pgConfig from './ormconfig';
import { HomeService, SignUpService, SignInService, UserService, ProfileService } from './handlers';

const { serverPort } = envConfig();

const app = express();
Server.buildServices(app, HomeService, SignUpService, SignInService, ProfileService);

createConnection(pgConfig)
	.then(async (connection) => {
		try {
			const initDb = fs.readFileSync(path.resolve(__dirname, './database/init.sql')).toString();
			await connection.query(initDb);
		} catch (err) {
			console.error('Unable to initialize tables', err);
		}

		app.listen(serverPort, '0.0.0.0', () => {
			console.log(`⚡️[server]: Server is running at port ${serverPort}`);
		});
	})
	.catch((err) => console.log(err));

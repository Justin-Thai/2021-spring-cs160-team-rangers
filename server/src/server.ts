import 'reflect-metadata';
import express from 'express';
import { Server } from 'typescript-rest';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

import { envConfig } from './config';
import { DbConnection } from './utils';
import { HomeService, SignUpService, SignInService, ProfileService, AuthService } from './handlers';

const { serverPort } = envConfig;

const app = express();

// Apply middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

Server.buildServices(app, HomeService, SignUpService, SignInService, ProfileService, AuthService);

const conn = new DbConnection();
conn
	.create()
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

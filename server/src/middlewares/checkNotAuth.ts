import express from 'express';

import { verifyJWT, sendErrorJSON, statusCodes } from '../utils';

export default function checkNotAuth(req: express.Request, res?: express.Response) {
	const token = req.header('token');
	if (token && verifyJWT(token)) {
		throw sendErrorJSON(res!, 'Unauthorized', statusCodes.Unauthorized);
	}
}

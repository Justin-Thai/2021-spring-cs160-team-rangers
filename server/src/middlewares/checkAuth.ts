import express from 'express';

import { jwtVerify, sendErrorJSON, statusCodes } from '../utils';

export default function checkAuth(req: express.Request, res?: express.Response) {
	const token = req.header('token');
	if (!token || !jwtVerify(token)) {
		throw sendErrorJSON(res!, 'Unauthorized', statusCodes.Unauthorized);
	}
}

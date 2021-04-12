import express from 'express';

import { decodeJWT, sendErrorJSON, statusCodes } from '../../utils';

export default function checkProfileAuthorization(req: express.Request, res?: express.Response) {
	const token = req.header('token');
	const userId = req.params['userId'];
	const payload = decodeJWT(token!);

	if (userId !== payload.id) {
		throw sendErrorJSON(res!, statusCodes.Unauthorized, 'Unauthorized');
	}
}

import express from 'express';

import { verifyJWT, decodeJWT, sendErrorJSON, statusCodes, nil } from '../../utils';
import { User } from '../../database/entity';

export default async function checkAuthentication(req: express.Request, res?: express.Response) {
	const token = req.header('token');
	if (!token || !verifyJWT(token)) {
		throw sendErrorJSON(res!, statusCodes.Unauthorized, 'Unauthorized');
	}

	try {
		const payload = decodeJWT(token!);
		const user = await User.findOne({ id: payload.id });
		if (!user) {
			throw sendErrorJSON(res!, statusCodes.Unauthorized, 'Unauthorized');
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

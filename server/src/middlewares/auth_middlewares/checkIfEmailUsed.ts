import express from 'express';

import { sendErrorJSON, statusCodes, nil } from '../../utils';
import { User } from '../../database/entity';

export default async function checkIfEmailUsed(req: express.Request, res?: express.Response) {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			throw sendErrorJSON(res!, statusCodes.BadRequest, 'Email is already in use');
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

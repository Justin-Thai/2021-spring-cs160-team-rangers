import express from 'express';

import { sendErrorJSON, statusCodes } from '../utils';
import { User } from '../database/entity';

export default async function checkIfUserNotExists(req: express.Request, res?: express.Response) {
	let userNotExists = false;
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			userNotExists = true;
		}
	} catch (err) {
		throw sendErrorJSON(res!, 'Unknown error occured', statusCodes.InternalServerError);
	}
	if (userNotExists) {
		throw sendErrorJSON(res!, 'User not found', statusCodes.BadRequest);
	}
}

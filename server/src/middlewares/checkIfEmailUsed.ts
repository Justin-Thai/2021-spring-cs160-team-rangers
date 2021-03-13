import express from 'express';

import { sendErrorJSON, statusCodes } from '../utils';
import { User } from '../database/entity';

export default async function checkIfEmailUsed(req: express.Request, res?: express.Response) {
	let userExists = false;
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			userExists = true;
		}
	} catch (err) {
		throw sendErrorJSON(res!, 'Unknown error occured', statusCodes.InternalServerError);
	}
	if (userExists) {
		throw sendErrorJSON(res!, 'User already existed', statusCodes.BadRequest);
	}
}
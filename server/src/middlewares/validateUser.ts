import express from 'express';
import { validateOrReject } from 'class-validator';

import { sendErrorJSON, statusCodes } from '../utils';
import { User } from '../database/entity';

export default async function validateUser(req: express.Request, res?: express.Response) {
	if (!req.body.email || !req.body.password) {
		throw sendErrorJSON(res!, 'Email or password is not present', statusCodes.BadRequest);
	}
	const { email, password } = req.body;
	const user = new User(email, password);
	try {
		await validateOrReject(user);
	} catch (errors) {
		const { property } = errors[0];
		if (property === 'email') {
			throw sendErrorJSON(res!, 'Email is invalid', statusCodes.BadRequest);
		} else if (property === 'password') {
			throw sendErrorJSON(res!, 'Password is invalid, must be between 8 at least characters', statusCodes.BadRequest);
		} else {
			throw sendErrorJSON(res!, 'Unknown error occured', statusCodes.InternalServerError);
		}
	}
}

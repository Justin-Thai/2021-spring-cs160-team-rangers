import express from 'express';
import { validateOrReject } from 'class-validator';

import { sendErrorJSON, statusCodes } from '../../utils';
import { User } from '../../database/entity';

export default async function validateUser(req: express.Request, res?: express.Response) {
	const { email, password } = req.body;

	if (!email || !password) {
		throw sendErrorJSON(res!, statusCodes.BadRequest, 'Email or password is not present');
	}

	const user = new User(email, password);
	try {
		await validateOrReject(user);
	} catch (errors) {
		const { property } = errors[0];
		if (property === 'email') {
			throw sendErrorJSON(res!, statusCodes.BadRequest, 'Email is invalid');
		} else if (property === 'password') {
			throw sendErrorJSON(res!, statusCodes.BadRequest, 'Password is invalid, must be between 8 at least characters');
		} else {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
	}
}

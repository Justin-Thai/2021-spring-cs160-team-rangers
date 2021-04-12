import express from 'express';
import { validateOrReject } from 'class-validator';

import { sendErrorJSON, statusCodes } from '../../utils';
import { User } from '../../database/entity';

export default async function validateUser(req: express.Request, res?: express.Response) {
	const { email, name, password } = req.body;

	if (!email || !password) {
		throw sendErrorJSON(res!, statusCodes.BadRequest, 'Email or password is not present');
	}

	if (req.path === '/signup' && !name) {
		throw sendErrorJSON(res!, statusCodes.BadRequest, 'Name is not present');
	}

	try {
		const user = new User(email, name, password);
		await validateOrReject(user);
	} catch (errors) {
		const { property } = errors[0];
		if (property === 'email') {
			throw sendErrorJSON(res!, statusCodes.BadRequest, 'Email is invalid');
		} else if (property === 'password') {
			throw sendErrorJSON(res!, statusCodes.BadRequest, 'Password is invalid, must be between 8 at least characters');
		} else if (property === 'name') {
			if (req.path === '/signin') {
				// going through, name is not required when sign in
			} else {
				throw sendErrorJSON(res!, statusCodes.BadRequest, 'Name is invalid');
			}
		} else {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
	}
}

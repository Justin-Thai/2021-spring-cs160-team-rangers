import express from 'express';
import bcrypt from 'bcrypt';

import { sendErrorJSON, statusCodes, nil } from '../../utils';
import { User } from '../../database/entity';

export default async function checkPassword(req: express.Request, res?: express.Response) {
	try {
		const { email, password } = req.body;
		const user = await User.findOneOrFail({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			throw sendErrorJSON(res!, statusCodes.Unauthorized, 'Email or password is incorrect');
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

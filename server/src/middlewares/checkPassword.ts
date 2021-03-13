import express from 'express';
import bcrypt from 'bcrypt';

import { sendErrorJSON, statusCodes } from '../utils';
import { User } from '../database/entity';

export default async function checkPassword(req: express.Request, res?: express.Response) {
  let isPasswordCorrect = true;
	try {
		const { email, password } = req.body;
		const user = await User.findOneOrFail({ email });
		isPasswordCorrect = await bcrypt.compare(password, user.password);
	} catch (err) {
		throw sendErrorJSON(res!, 'Unknown error occured', statusCodes.InternalServerError);
	}
  if (!isPasswordCorrect) {
    throw sendErrorJSON(res!, 'Email or password is incorrect', statusCodes.Unauthorized);
  }
}

import { Path, POST, ServiceContext, Context, FormParam, PreProcessor } from 'typescript-rest';
import { validateOrReject } from 'class-validator';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';

import { resOK, resError, sendErrorJSON, statusCodes } from '../utils';
import { User } from '../database/entity';
import { envConfig, appConfig } from '../config';
import { checkNotAuth } from '../middlewares';

const { jwtSecretKey } = envConfig;
const { jwtExpire } = appConfig;

async function userValidator(req: express.Request, res?: express.Response) {
	if (!req.body.email || !req.body.password) {
		throw sendErrorJSON(res!, 'Email or password is not present.', statusCodes.BadRequest);
	}
	const { email, password } = req.body;
	const user = new User(email, password);
	try {
		await validateOrReject(user);
	} catch (errors) {
		if (errors[0].property === 'email') {
			throw sendErrorJSON(res!, 'Email is invalid.', statusCodes.BadRequest);
		} else if (errors[0].property === 'password') {
			throw sendErrorJSON(res!, 'Password is invalid.', statusCodes.BadRequest);
		} else {
			throw sendErrorJSON(res!, 'Internal server error.', statusCodes.InternalServerError);
		}
	}
}

@Path('/signin')
export default class SignInService {
	@Context
	context: ServiceContext;

	@POST
	@PreProcessor(checkNotAuth)
	@PreProcessor(userValidator)
	async signin(@FormParam('email') email: string, @FormParam('password') password: string) {
		const res = this.context.response;
		try {
			const users = await User.findBy({ email });
			if (!users.length) {
				return sendErrorJSON(res, 'User not found.', statusCodes.NotFound);
			}

			const isPasswordCorrect = await bcrypt.compare(password, users[0].password);
			if (!isPasswordCorrect) {
				return sendErrorJSON(res, 'Email or password is incorrect.', statusCodes.Unauthorized);
			}

			const user = users[0];
			const token = jwt.sign(user.toInsensitiveJSON(), jwtSecretKey, { expiresIn: jwtExpire });
			res.status(statusCodes.OK);
			return resOK({ token });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError(err.message);
		}
	}
}

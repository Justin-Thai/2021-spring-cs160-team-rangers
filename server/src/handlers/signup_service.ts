import { Path, POST, ServiceContext, Context, FormParam, PreProcessor } from 'typescript-rest';
import { validateOrReject } from 'class-validator';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';

import { resOK, resError, sendErrorJSON, statusCodes } from '../utils';
import { User } from '../database/entity';
import { envConfig, appConfig } from '../config';
import { checkNotAuth } from '../middlewares';

const { jwtSecretKey } = envConfig();
const { saltRounds, jwtExpire } = appConfig;

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

@Path('/signup')
export default class SignUpService {
	@Context
	context: ServiceContext;

	@POST
	@PreProcessor(checkNotAuth)
	@PreProcessor(userValidator)
	async signup(@FormParam('email') email: string, @FormParam('password') password: string) {
		const res = this.context.response;
		try {
            const users = await User.findBy({ email });
            if (users.length) {
                return sendErrorJSON(res, 'User already existed.', statusCodes.Unauthorized);
            }

			const hashedPassword = await bcrypt.hash(password, saltRounds);
			const newUser = new User(email, hashedPassword);
			const token = jwt.sign(newUser.toInsensitiveJSON(), jwtSecretKey, { expiresIn: jwtExpire });
			res.setHeader('token', token);
			res.status(statusCodes.OK);
			await newUser.save();
			return resOK();
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError(err.message);
		}
	}
}

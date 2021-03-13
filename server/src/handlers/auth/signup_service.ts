import { Path, POST, ServiceContext, Context, FormParam, PreProcessor } from 'typescript-rest';

import { resOK, resError, statusCodes, hashPassword, generateJWT } from '../../utils';
import { User } from '../../database/entity';
import { checkNotAuth, checkIfEmailUsed, validateUser } from '../../middlewares';

@Path('/signup')
@PreProcessor(checkNotAuth)
@PreProcessor(validateUser)
@PreProcessor(checkIfEmailUsed)
export default class SignUpService {
	@Context
	context: ServiceContext;

	@POST
	async signup(@FormParam('email') email: string, @FormParam('password') password: string) {
		const res = this.context.response;
		try {
			const hashedPassword = await hashPassword(password);
			const newUser = new User(email, hashedPassword);
			await newUser.save();
			const token = generateJWT(newUser);
			res.status(statusCodes.OK);
			return resOK({ token });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
}

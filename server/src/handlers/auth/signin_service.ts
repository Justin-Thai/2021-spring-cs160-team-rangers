import { Path, POST, ServiceContext, Context, FormParam, PreProcessor } from 'typescript-rest';

import { resOK, resError, statusCodes, generateJWT } from '../../utils';
import { User } from '../../database/entity';
import { checkNotAuth, validateUser, checkIfUserNotExists, checkPassword } from '../../middlewares';

@Path('/signin')
export default class SignInService {
	@Context
	context: ServiceContext;

	@POST
	@PreProcessor(checkNotAuth)
	@PreProcessor(validateUser)
	@PreProcessor(checkIfUserNotExists)
	@PreProcessor(checkPassword)
	async signin(@FormParam('email') email: string) {
		const res = this.context.response;
		try {
			const users = await User.findBy({ email });
			const token = generateJWT(users[0]);
			res.status(statusCodes.OK);
			return resOK({ token });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
}

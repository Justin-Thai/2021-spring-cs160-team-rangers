import { Path, POST, ServiceContext, Context, FormParam, PreProcessor } from 'typescript-rest';

import { resOK, resError, statusCodes, generateJWT } from '../../utils';
import { User } from '../../database/entity';
import { validateUser, checkIfUserExists, checkPassword } from '../../middlewares';

@Path('/signin')
@PreProcessor(validateUser)
@PreProcessor(checkIfUserExists)
@PreProcessor(checkPassword)
export default class SignInService {
	@Context
	context: ServiceContext;

	@POST
	async signin(@FormParam('email') email: string) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail({ email });
			const token = generateJWT(user);
			res.status(statusCodes.OK);
			return resOK({ token });
		} catch (err) {
			console.log(err.message);
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
}

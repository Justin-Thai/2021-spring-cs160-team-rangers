import { Path, GET, ServiceContext, Context, PreProcessor } from 'typescript-rest';

import { resOK, resError, statusCodes } from '../../utils';
import { checkAuth } from '../../middlewares';

@Path('/auth')
@PreProcessor(checkAuth)
export default class AuthService {
	@Context
	context: ServiceContext;

	@GET
	async auth() {
		const res = this.context.response;
		try {
			res.status(statusCodes.OK);
			return resOK();
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
}

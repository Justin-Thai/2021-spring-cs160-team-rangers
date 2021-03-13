import { Path, GET, ServiceContext, Context, PreProcessor } from 'typescript-rest';

import { resOK, resError, statusCodes } from '../../utils';
import { checkAuthentication } from '../../middlewares';

@Path('/auth')
@PreProcessor(checkAuthentication)
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

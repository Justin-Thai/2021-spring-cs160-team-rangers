import { Path, GET, ServiceContext, Context } from 'typescript-rest';

import { resOK, statusCodes } from '../utils';

@Path('/')
export default class HomeService {
	@Context
	context: ServiceContext;

	@GET
	async index() {
		this.context.response.status(statusCodes.OK);
		return resOK({ status: 'ok' });
	}
}

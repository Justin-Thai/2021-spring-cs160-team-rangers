import { Path, GET, ServiceContext, Context } from 'typescript-rest';

import { resOK, status } from '../utils';

@Path('/')
export default class Home {
	@Context
	context: ServiceContext;

	@GET
	async index() {
		this.context.response.status(status.OK);
		return resOK({ status: 'ok' });
	}
}

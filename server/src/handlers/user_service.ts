import { Path, GET, ServiceContext, Context, PathParam } from 'typescript-rest';
import { getRepository } from 'typeorm';

import { resOK, resError, status } from '../utils';
import { User } from '../database/entity';

@Path('/users')
export default class UserService {
	@Context
	context: ServiceContext;

	@GET
	async getUsers() {
		const { response } = this.context;
		try {
			const users = await User.getAll();
			response.status(status.OK);
			return resOK(users);
		} catch (err) {
			response.status(status.InternalServerError);
			return resError(err.message);
		}
	}

	@GET
	@Path(":userId")
	async getUser(@PathParam("userId") userId: number) {
		const { response } = this.context;
		try { 
			const user = await User.getOne(userId);
			if (user) {
				response.status(status.OK);
				return resOK(user);
			}
			response.status(status.NotFound);
			return resError('User not found');
		} catch (err) {
			response.status(status.InternalServerError);
			return resError(err.message);
		}
	}
}

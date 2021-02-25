import { Path, GET, ServiceContext, Context, PathParam } from 'typescript-rest';

import { resOK, resError, statusCodes } from '../utils';
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
			response.status(statusCodes.OK);
			return resOK(users);
		} catch (err) {
			response.status(statusCodes.InternalServerError);
			return resError(err.message);
		}
	}

	@GET
	@Path(':userId')
	async getUser(@PathParam('userId') userId: string) {
		const { response } = this.context;
		try {
			const user = await User.findById(userId);
			if (user) {
				response.status(statusCodes.OK);
				return resOK(user);
			}
			response.status(statusCodes.NotFound);
			return resError('User not found');
		} catch (err) {
			response.status(statusCodes.InternalServerError);
			return resError(err.message);
		}
	}
}

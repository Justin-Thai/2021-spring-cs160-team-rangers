import { Path, GET, ServiceContext, Context, PathParam, PreProcessor } from 'typescript-rest';

import { resOK, resError, sendErrorJSON, statusCodes } from '../../utils';
import { User } from '../../database/entity';
import { checkAuthentication, checkProfileAuthorization } from '../../middlewares';

@Path('/profile/:userId')
export default class ProfileService {
	@Context
	context: ServiceContext;

	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	async getProfile(@PathParam('userId') userId: string) {
		const res = this.context.response;
		try {
			const user = await User.findOne(userId);

			if (!user) {
				return sendErrorJSON(res, statusCodes.NotFound, 'User not found');
			}

			res.status(statusCodes.OK);
			return resOK({ user: { id: user.id, email: user.email, name: user.name, deck_count: user.deck_count } });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
}

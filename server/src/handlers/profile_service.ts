import { Path, GET, ServiceContext, Context, PathParam, PreProcessor } from 'typescript-rest';

import { resOK, resError, sendErrorJSON, statusCodes, decodeJWT } from '../utils';
import { User } from '../database/entity';
import { checkAuth } from '../middlewares';

@Path('/profile/:userId')
@PreProcessor(checkAuth)
export default class ProfileService {
	@Context
	context: ServiceContext;

	@GET
	async getProfile(@PathParam('userId') userId: string) {
		const res = this.context.response;
		const req = this.context.request;
		try {
			const token = req.header('token');
			const payload = decodeJWT(token!) as {
				[key: string]: any;
			};

			if (userId !== payload.id) {
				return sendErrorJSON(res, 'Unauthorized.', statusCodes.Unauthorized);
			}

			const user = await User.findById(userId);

			if (!user) {
				return sendErrorJSON(res, 'User not found.', statusCodes.NotFound);
			}

			res.status(statusCodes.OK);
			return resOK({ user: { id: user.id, email: user.email } });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError(err.message);
		}
	}
}

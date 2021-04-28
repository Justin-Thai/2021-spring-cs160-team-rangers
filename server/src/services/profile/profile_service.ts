import { Path, GET, ServiceContext, Context, PathParam, PreProcessor, FormParam, PUT } from 'typescript-rest';

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
			return resOK({
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
					deck_count: user.deck_count,
					report_count: user.report_count,
				},
			});
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/edit')
	@PUT
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	async updateProfile(
		@PathParam('userId') userId: string,
		@FormParam('name') name: string,
		@FormParam('email') email: string
	) {
		const res = this.context.response;
		try {
			if (!name && !email) {
				res.status(statusCodes.NotModified);
				return resOK();
			}
			const user = await User.findOne(userId);

			if (!user) {
				return sendErrorJSON(res, statusCodes.NotFound, 'User not found');
			}

			const userEmail = await User.findOne({ email });
			if (userEmail) {
				res.status(statusCodes.BadRequest);
				return resError('Email is already in used');
			}

			if (name && user.name !== name) {
				user.name = name;
			}

			if (email && user.email !== email) {
				user.email = email;
			}

			await user.save();
			res.status(statusCodes.OK);
			return resOK({ user: { id: user.id, email: user.email, name: user.name, deck_count: user.deck_count } });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
}

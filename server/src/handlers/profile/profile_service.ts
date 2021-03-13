import { Path, GET, POST, ServiceContext, Context, PathParam, FormParam, PreProcessor } from 'typescript-rest';

import { resOK, resError, sendErrorJSON, statusCodes } from '../../utils';
import { User, Deck } from '../../database/entity';
import { checkAuthentication, checkProfileAuthorization, validateDeck } from '../../middlewares';

@Path('/profile/:userId')
@PreProcessor(checkAuthentication)
@PreProcessor(checkProfileAuthorization)
export default class ProfileService {
	@Context
	context: ServiceContext;

	@GET
	async getProfile(@PathParam('userId') userId: string) {
		const res = this.context.response;
		try {
			const user = await User.findOne(userId);

			if (!user) {
				return sendErrorJSON(res, 'User not found', statusCodes.NotFound);
			}

			res.status(statusCodes.OK);
			return resOK({ user: { id: user.id, email: user.email } });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck')
	@POST
	@PreProcessor(validateDeck)
	async createDeck(@PathParam('userId') userId: string, @FormParam('name') name: string) {
		const res = this.context.response;
		try {
			const newDeck = new Deck(userId, name);
			newDeck.save();
			res.status(statusCodes.OK);
			return resOK();
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck')
	@GET
	async getAllDeck(@PathParam('userId') userId: string) {
		const res = this.context.response;
		try {
			const user = await User.findOne(userId);
			const decks = await user?.getDecks();
			// const decks = await Deck.getAll();
			res.status(statusCodes.OK);
			return resOK({ decks });
		} catch (err) {
			console.log(err);
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	// @Path('/deck/:deckId')
	// @GET
	// async getDeck(@PathParam('deckId') deckId: string) {
	// 	const res = this.context.response;
	// 	try {
	// 		const decks = await Deck.findById(deckId);
	// 		res.status(statusCodes.OK);
	// 		return resOK({ decks });
	// 	} catch (err) {
	// 		console.log(err);
	// 		res.status(statusCodes.InternalServerError);
	// 		return resError();
	// 	}
	// }
}

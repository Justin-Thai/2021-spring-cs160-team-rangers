import {
	Path,
	GET,
	POST,
	PUT,
	DELETE,
	ServiceContext,
	Context,
	PathParam,
	FormParam,
	QueryParam,
	PreProcessor,
} from 'typescript-rest';

import { resOK, resError, statusCodes } from '../../utils';
import { User, Deck } from '../../database/entity';
import {
	checkAuthentication,
	checkProfileAuthorization,
	validateDeck,
	validateDeckChanges,
	checkIfDeckExists,
} from '../../middlewares';

@Path('/profile/:userId')
export default class DeckService {
	@Context
	context: ServiceContext;

	@Path('/deck')
	@POST
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(validateDeck)
	async createDeck(
		@PathParam('userId') userId: string,
		@FormParam('name') name: string,
		@FormParam('shared') shared: boolean
	) {
		const res = this.context.response;
		try {
			const newDeck = new Deck(userId, name, shared);
			await newDeck.save();
			const user = await User.findOneOrFail(userId);
			user.deck_count += 1;
			await user.save();
			res.status(statusCodes.Created);
			return resOK({ deck: newDeck });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	async getAllDecks(
		@PathParam('userId') userId: string,
		@QueryParam('name') name: string,
		@QueryParam('limit') limit: number,
		@QueryParam('page') page: number
	) {
		const res = this.context.response;
		try {
			if (limit === undefined) {
				limit = 9;
			}
			if (page === undefined) {
				page = 1;
			}

			if (name) {
				const user = await User.findOneOrFail(userId);
				const decks = await user.filterDeckByName(name, limit, page);
				res.status(statusCodes.OK);
				return resOK({ decks });
			}

			const user = await User.findOneOrFail(userId);
			const decks = await user.getDecks(limit, page);
			res.status(statusCodes.OK);
			return resOK({ decks });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	async getDeck(@PathParam('userId') userId: string, @PathParam('deckId') deckId: number) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			const deck = await user.getDeckById(deckId);
			res.status(statusCodes.OK);
			return resOK({ deck });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId')
	@PUT
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(validateDeckChanges)
	async updateDeck(
		@PathParam('userId') userId: string,
		@PathParam('deckId') deckId: number,
		@FormParam('name') name: string,
		@FormParam('shared') sharedValueInString: string
	) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			const deck = await user.getDeckById(deckId);

			if (name) {
				deck!.name = name;
			}
			if (sharedValueInString !== undefined) {
				deck!.shared = Boolean(JSON.parse(sharedValueInString));
			}

			await deck!.save();
			res.status(statusCodes.OK);
			return resOK({ deck });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId')
	@DELETE
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	async deleteDeck(@PathParam('userId') userId: string, @PathParam('deckId') deckId: number) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			await Deck.delete(deckId);
			user.deck_count -= 1;
			await user.save();
			res.status(statusCodes.OK);
			return resOK({ message: `Successfully deleted deck ${deckId}` });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
}

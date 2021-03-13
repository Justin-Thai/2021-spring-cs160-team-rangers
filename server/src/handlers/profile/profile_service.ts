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

import { resOK, resError, sendErrorJSON, statusCodes } from '../../utils';
import { User, Deck, Card } from '../../database/entity';
import { checkAuthentication, checkProfileAuthorization, validateDeck, validateCard } from '../../middlewares';

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

	/**----------------------------------Deck Methods---------------------------------- */

	@Path('/deck')
	@POST
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
			res.status(statusCodes.Created);
			return resOK({ deck: newDeck });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck')
	@GET
	async getAllDecks(@PathParam('userId') userId: string, @QueryParam('name') name: string) {
		const res = this.context.response;
		try {
			if (name) {
				const user = await User.findOneOrFail(userId);
				const decks = await user.filterDeckByName(name);
				res.status(statusCodes.OK);
				return resOK({ decks });
			}
			const user = await User.findOneOrFail(userId);
			const decks = await user.getDecks();
			res.status(statusCodes.OK);
			return resOK({ decks });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId')
	@GET
	async getDeck(@PathParam('userId') userId: string, @PathParam('deckId') deckId: string) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			const deck = await user.getDeckById(deckId);
			if (!deck) {
				return sendErrorJSON(res, 'Deck not found', statusCodes.NotFound);
			}
			res.status(statusCodes.OK);
			return resOK({ deck });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId')
	@PUT
	async updateDeck(
		@PathParam('userId') userId: string,
		@PathParam('deckId') deckId: string,
		@FormParam('name') name: string,
		@FormParam('shared') shared: boolean
	) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			const deck = await user.getDeckById(deckId);

			if (!deck) {
				return sendErrorJSON(res, 'Deck not found', statusCodes.NotFound);
			}

			deck.name = name;

			if (shared !== undefined) {
				deck.shared = shared;
			}

			await deck.save();
			res.status(statusCodes.Created);
			return resOK({ deck });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId')
	@DELETE
	async deleteDeck(@PathParam('userId') userId: string, @PathParam('deckId') deckId: string) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			const deck = await user.getDeckById(deckId);

			if (!deck) {
				return sendErrorJSON(res, 'Deck not found', statusCodes.NotFound);
			}

			await deck.remove();
			res.status(statusCodes.OK);
			return resOK();
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	/**----------------------------------End Deck Methods---------------------------------- */

	/**----------------------------------Card Methods---------------------------------- */

	@Path('/deck/:deckId/card')
	@POST
	@PreProcessor(validateCard)
	async createCard(
		@PathParam('deckId') deckId: string,
		@FormParam('front_side') front_side: string,
		@FormParam('back_side') back_side: string,
		@FormParam('background_color') background_color: string,
		@FormParam('font_color') font_color: string,
		@FormParam('font') font: string
	) {
		const res = this.context.response;
		try {
			const newCard = new Card(deckId, front_side, back_side, background_color, font_color, font);
			await newCard.save();
			res.status(statusCodes.Created);
			return resOK({ card: newCard });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/card')
	@GET
	async getAllCards(
		@PathParam('deckId') deckId: string,
		@QueryParam('front') front_side: string,
		@QueryParam('back') back_side: string
	) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);

			if (front_side || back_side) {
				const cards = await deck.filterCard(front_side, back_side);
				res.status(statusCodes.OK);
				return resOK({ cards });
			}

			const cards = await deck.getCards();
			res.status(statusCodes.OK);
			return resOK({ cards });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/card/:cardId')
	@GET
	async getCard(@PathParam('deckId') deckId: string, @PathParam('cardId') cardId: string) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const card = await deck.getCardById(cardId);

			if (!card) {
				return sendErrorJSON(res, 'Card not found', statusCodes.NotFound);
			}

			res.status(statusCodes.OK);
			return resOK({ card });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
	/**----------------------------------End Card Methods---------------------------------- */
}

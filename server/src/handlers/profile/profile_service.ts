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
import {
	checkAuthentication,
	checkProfileAuthorization,
	validateDeck,
	validateDeckChanges,
	validateCard,
	validateCardChanges,
	checkIfDeckExists,
	checkIfCardExists,
} from '../../middlewares';

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
			return resOK({ user: { id: user.id, email: user.email } });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	/**----------------------------------Deck Methods---------------------------------- */

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
		console.log('deck put');
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
			res.status(statusCodes.Created);
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
			const deck = await user.getDeckById(deckId);
			await deck!.deleteCards();
			await deck!.remove();
			res.status(statusCodes.OK);
			return resOK({ message: `Successfully deleted deck ${deckId}` });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	/**----------------------------------End Deck Methods---------------------------------- */

	/**----------------------------------Card Methods---------------------------------- */

	@Path('/deck/:deckId/card')
	@POST
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(validateCard)
	async createCard(
		@PathParam('deckId') deckId: number,
		@FormParam('front_side') front_side: string,
		@FormParam('back_side') back_side: string,
		@FormParam('background_color') background_color: string,
		@FormParam('font_color') font_color: string,
		@FormParam('font') font: string
	) {
		const res = this.context.response;
		try {
			const newCard = new Card(deckId, front_side, back_side, background_color, font_color, font);
			const deck = await Deck.findOneOrFail(deckId);
			deck.count += 1;
			await newCard.save();
			await deck.save();
			res.status(statusCodes.Created);
			return resOK({ card: newCard });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/card')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	async getAllCards(
		@PathParam('deckId') deckId: number,
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
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfCardExists)
	async getCard(@PathParam('deckId') deckId: number, @PathParam('cardId') cardId: number) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const card = await deck.getCardById(cardId);
			res.status(statusCodes.OK);
			return resOK({ card });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/card/:cardId')
	@PUT
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfCardExists)
	@PreProcessor(validateCardChanges)
	async updateCard(
		@PathParam('deckId') deckId: number,
		@PathParam('cardId') cardId: number,
		@FormParam('front_side') front_side: string,
		@FormParam('back_side') back_side: string,
		@FormParam('background_color') background_color: string,
		@FormParam('font_color') font_color: string,
		@FormParam('font') font: string
	) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const card = await deck.getCardById(cardId);

			if (front_side) {
				card!.front_side = front_side;
			}

			if (back_side) {
				card!.back_side = back_side;
			}

			if (background_color) {
				card!.background_color = background_color;
			}

			if (font_color) {
				card!.font_color = font_color;
			}

			if (font) {
				card!.font = font;
			}

			await card!.save();
			res.status(statusCodes.Created);
			return resOK({ card });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/card/:cardId')
	@DELETE
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfCardExists)
	async deleteCard(@PathParam('deckId') deckId: string, @PathParam('cardId') cardId: number) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const card = await deck.getCardById(cardId);
			deck!.count -= 1;
			await deck!.save();
			await card!.remove();
			res.status(statusCodes.OK);
			return resOK({ message: `Successfully deleted card ${cardId}` });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
	/**----------------------------------End Card Methods---------------------------------- */
}

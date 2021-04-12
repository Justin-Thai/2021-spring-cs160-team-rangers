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
import { Deck, Card } from '../../database/entity';
import {
	checkAuthentication,
	checkProfileAuthorization,
	validateCard,
	validateCardChanges,
	checkIfDeckExists,
	checkIfCardExists,
} from '../../middlewares';

@Path('/profile/:userId')
export default class CardService {
	@Context
	context: ServiceContext;

	@Path('/deck/:deckId/card')
	@POST
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(validateCard)
	async createCard(
		@PathParam('deckId') deckId: number,
		@FormParam('front_side') front_side: string,
		@FormParam('back_side') back_side: string
	) {
		const res = this.context.response;
		try {
			const newCard = new Card(deckId, front_side, back_side);
			const deck = await Deck.findOneOrFail(deckId);
			deck.card_count += 1;
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
		@FormParam('back_side') back_side: string
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

			await card!.save();
			res.status(statusCodes.OK);
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
			deck!.card_count -= 1;
			await deck!.save();
			await card!.remove();
			res.status(statusCodes.OK);
			return resOK({ message: `Successfully deleted card ${cardId}` });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
}

import express from 'express';

import { sendErrorJSON, statusCodes, isItemsIdValid, nil } from '../../utils';
import { Deck } from '../../database/entity';

export default async function checkIfCardExists(req: express.Request, res?: express.Response) {
	const { deckId, cardId } = req.params;

	if (!isItemsIdValid(cardId)) {
		throw sendErrorJSON(res!, statusCodes.BadRequest, 'Invalid card id format');
	}

	const carcdIdNo = Number(cardId);
	try {
		const deck = await Deck.findOneOrFail(deckId);
		const card = await deck.getCardById(carcdIdNo);

		if (!card) {
			throw sendErrorJSON(res!, statusCodes.NotFound, 'Card not found');
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

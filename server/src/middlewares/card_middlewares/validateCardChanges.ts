import express from 'express';

import { sendErrorJSON, statusCodes, nil } from '../../utils';
import { Deck } from '../../database/entity';

function throwRedirect(res: express.Response) {
	res.set('Content-Type', 'application/json');
	res.status(statusCodes.NotModified).json({ message: 'Card is unchanged' });
}

export default async function validateCardChanges(req: express.Request, res?: express.Response) {
	const { front_side, back_side } = req.body;

	if (!front_side && !back_side) {
		throw throwRedirect(res!);
	}

	try {
		const { deckId, cardId } = req.params;
		const deck = await Deck.findOneOrFail(deckId);
		const card = await deck.getCardById(Number(cardId));

		const areFrontSidesSame = !front_side ? true : front_side === card!.front_side;
		const areBackSidesSame = !back_side ? true : back_side === card!.back_side;

		if (areFrontSidesSame && areBackSidesSame) {
			throw throwRedirect(res!);
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

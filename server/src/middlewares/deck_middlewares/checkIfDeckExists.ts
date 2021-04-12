import express from 'express';

import { sendErrorJSON, statusCodes, isItemsIdValid, nil } from '../../utils';
import { User } from '../../database/entity';

export default async function checkIfDeckExists(req: express.Request, res?: express.Response) {
	const { userId, deckId } = req.params;

	if (!isItemsIdValid(deckId)) {
		throw sendErrorJSON(res!, statusCodes.BadRequest, 'Invalid deck id format');
	}

	const deckIdNo = Number(deckId);
	try {
		const user = await User.findOneOrFail(userId);
		const deck = await user.getDeckById(deckIdNo);

		if (!deck) {
			throw sendErrorJSON(res!, statusCodes.NotFound, 'Deck not found');
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

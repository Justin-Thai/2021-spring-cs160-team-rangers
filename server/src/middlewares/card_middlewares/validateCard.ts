import express from 'express';
import { validateOrReject } from 'class-validator';

import { sendErrorJSON, statusCodes } from '../../utils';
import { Card } from '../../database/entity';

export default async function validateCard(req: express.Request, res?: express.Response) {
	const { front_side, back_side } = req.body;

	if (!front_side || !back_side) {
		throw sendErrorJSON(res!, statusCodes.BadRequest, 'Front or back side of the card is not present');
	}

	try {
		const deckId = req.params['deckId'];
		const card = new Card(Number(deckId), front_side, back_side);
		await validateOrReject(card);
	} catch (errors) {
		const { property } = errors[0];
		if (property === 'front_side') {
			throw sendErrorJSON(res!, statusCodes.BadRequest, 'Card front side is invalid');
		} else if (property === 'back_side') {
			throw sendErrorJSON(res!, statusCodes.BadRequest, 'Card back side is invalid');
		} else {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
	}
}

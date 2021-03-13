import express from 'express';
import { validateOrReject } from 'class-validator';

import { sendErrorJSON, statusCodes } from '../utils';
import { Card } from '../database/entity';

export default async function validateCard(req: express.Request, res?: express.Response) {
	const { front_side, back_side } = req.body;

	if (!front_side || !back_side) {
		throw sendErrorJSON(res!, 'Front or back side of the card is not present', statusCodes.BadRequest);
	}

	const deckId = req.params['deckId'];
	const card = new Card(deckId, front_side, back_side);

	try {
		await validateOrReject(card);
	} catch (errors) {
		const { property } = errors[0];
    console.log(errors)
		if (property === 'front_side') {
			throw sendErrorJSON(res!, 'Card front side is invalid', statusCodes.BadRequest);
		} else if (property === 'back_side') {
			throw sendErrorJSON(res!, 'Card back side is invalid', statusCodes.BadRequest);
		} else {
			throw sendErrorJSON(res!, 'Unknown error occured', statusCodes.InternalServerError);
		}
	}
}

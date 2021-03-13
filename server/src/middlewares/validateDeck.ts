import express from 'express';
import { validateOrReject } from 'class-validator';

import { sendErrorJSON, statusCodes } from '../utils';
import { Deck } from '../database/entity';

export default async function validateDeck(req: express.Request, res?: express.Response) {
	if (!req.body.name) {
		throw sendErrorJSON(res!, 'Deck name is not present', statusCodes.BadRequest);
	}
	const { name, shared } = req.body;
  const userId = req.params['userId'];
	const deck = new Deck(userId, name, shared);
	try {
		await validateOrReject(deck);
	} catch (errors) {
		const { property } = errors[0];
		if (property === 'name') {
			throw sendErrorJSON(res!, 'Deck name is invalid', statusCodes.BadRequest);
		} else {
			throw sendErrorJSON(res!, 'Unknown error occured', statusCodes.InternalServerError);
		}
	}
}

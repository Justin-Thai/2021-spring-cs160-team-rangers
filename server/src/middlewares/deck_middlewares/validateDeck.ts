import express from 'express';
import { validateOrReject } from 'class-validator';

import { sendErrorJSON, statusCodes } from '../../utils';
import { Deck } from '../../database/entity';

export default async function validateDeck(req: express.Request, res?: express.Response) {
	if (!req.body.name) {
		throw sendErrorJSON(res!, statusCodes.BadRequest, 'Deck name is not present');
	}

	const { name, shared } = req.body;
	let sharedValue: boolean | undefined = false;

	if (shared !== undefined) {
		if (typeof shared === 'string' && (shared === 'true' || shared === 'false')) {
			sharedValue = Boolean(JSON.parse(shared));
		} else {
			throw sendErrorJSON(res!, statusCodes.BadRequest, 'Deck shared value is invalid');
		}
	} else {
		sharedValue = undefined;
	}

	try {
		const userId = req.params['userId'];
		const deck = new Deck(userId, name as string, sharedValue);
		await validateOrReject(deck);
	} catch (errors) {
		const { property } = errors[0];
		if (property === 'user_id') {
			throw sendErrorJSON(res!, statusCodes.BadRequest, "Owner's id is invalid");
		} else if (property === 'name') {
			throw sendErrorJSON(res!, statusCodes.BadRequest, 'Deck name is invalid');
		} else if (property === 'shared') {
			throw sendErrorJSON(res!, statusCodes.BadRequest, 'Deck shared value is invalid');
		} else {
			throw sendErrorJSON(res!, statusCodes.InternalServerError, 'Deck validation failed');
		}
	}
}

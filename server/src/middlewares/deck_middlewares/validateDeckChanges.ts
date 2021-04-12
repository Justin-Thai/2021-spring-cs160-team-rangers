import express from 'express';

import { sendErrorJSON, statusCodes, nil } from '../../utils';
import { User } from '../../database/entity';

function throwRedirect(res: express.Response) {
	res.set('Content-Type', 'application/json');
	res.status(statusCodes.NotModified).json({ message: 'Deck is unchanged' });
}

export default async function validateDeckChanges(req: express.Request, res?: express.Response) {
	const { name, shared } = req.body;

	if (!name && !shared) {
		throw throwRedirect(res!);
	}

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
		const { userId, deckId } = req.params;
		const user = await User.findOneOrFail(userId);
		const deck = await user.getDeckById(Number(deckId));

		const areNamesSame = !name ? true : name === deck!.name;
		const areSharedsSame = sharedValue === undefined ? true : sharedValue === deck!.shared;

		if (areNamesSame && areSharedsSame) {
			throw throwRedirect(res!);
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

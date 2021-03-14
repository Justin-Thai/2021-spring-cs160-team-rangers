import express from 'express';

import { sendErrorJSON, statusCodes, nil } from '../../utils';
import { Deck } from '../../database/entity';

function throwRedirect(res: express.Response) {
	res.set('Content-Type', 'application/json');
	res.status(statusCodes.NotModified).json({ message: 'Card is unchanged' });
}

export default async function validateCardChanges(req: express.Request, res?: express.Response) {
	const { front_side, back_side, background_color, font_color, font } = req.body;

	if (!front_side && !back_side && !background_color && !font_color && !font) {
		throw throwRedirect(res!);
	}

	try {
		const { deckId, cardId } = req.params;
		const deck = await Deck.findOneOrFail(deckId);
		const card = await deck.getCardById(Number(cardId));

		const areFrontSidesSame = !front_side ? true : front_side === card!.front_side;
		const areBackSidesSame = !back_side ? true : back_side === card!.back_side;
		const areBackgroundColorsSame = !background_color ? true : background_color === card!.background_color;
		const areFontColorsSame = !font_color ? true : font_color === card!.font_color;
		const areFontsSame = !font ? true : font === card!.font;

		if (areFrontSidesSame && areBackSidesSame && areBackgroundColorsSame && areFontColorsSame && areFontsSame) {
			throw throwRedirect(res!);
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

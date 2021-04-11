import express from 'express';
import { validateOrReject } from 'class-validator';

import { sendErrorJSON, statusCodes } from '../../utils';
import { Deck, StudyReport } from '../../database/entity';

export default async function validateStudyReport(req: express.Request, res?: express.Response) {
	try {
		const userId = req.params['userId'];
		const deckId = req.params['deckId'];
		const deck = await Deck.findOneOrFail(deckId);
		const name = deck.name + " Study Report";
		const studyReport = new StudyReport(userId, Number(deckId), name);
		await validateOrReject(studyReport);
	} catch (errors) {
		throw sendErrorJSON(res!, statusCodes.InternalServerError);
	}
}

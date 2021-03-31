import express from 'express';
import { validateOrReject } from 'class-validator';

import { sendErrorJSON, statusCodes } from '../../utils';
import { StudyReport } from '../../database/entity';

export default async function validateStudyReport(req: express.Request, res?: express.Response) {
	try {
		const userId = req.params['userId'];
		const deckId = req.params['deckId'];
		const studyReport = new StudyReport(userId, Number(deckId));
		await validateOrReject(studyReport);
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

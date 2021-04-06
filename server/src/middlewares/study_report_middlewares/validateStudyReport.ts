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
		console.log(errors);
		throw sendErrorJSON(res!, statusCodes.InternalServerError);
	}
}

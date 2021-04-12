import express from 'express';

import { sendErrorJSON, statusCodes, isItemsIdValid, nil } from '../../utils';
import { User, Deck } from '../../database/entity';

export default async function checkIfStudyReportExists(req: express.Request, res?: express.Response) {
	const { userId, deckId, reportId } = req.params;

	if (!isItemsIdValid(reportId)) {
		throw sendErrorJSON(res!, statusCodes.BadRequest, 'Invalid study report id format');
	}

	const reportIdNo = Number(reportId);
	try {
		const deck = await Deck.findOneOrFail(deckId);
		const deckStudyReport = await deck.getStudyReportById(reportIdNo);
		const user = await User.findOneOrFail(userId);
		const studyReport = await user.getUserStudyReportById(reportIdNo);

		if (!studyReport && !deckStudyReport) {
			throw sendErrorJSON(res!, statusCodes.NotFound, 'Study Report not found');
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

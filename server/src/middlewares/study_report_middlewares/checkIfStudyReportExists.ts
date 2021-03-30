import express from 'express';

import { sendErrorJSON, statusCodes, isItemsIdValid, nil } from '../../utils';
import { Deck } from '../../database/entity';

export default async function checkIfStudyReportExists(req: express.Request, res?: express.Response) {
	const { deckId, reportId } = req.params;

	if (!isItemsIdValid(reportId)) {
		throw sendErrorJSON(res!, statusCodes.BadRequest, 'Invalid study report id format');
	}

	const reportIdNo = Number(reportId);
	try {
		const deck = await Deck.findOneOrFail(deckId);
		const studyReport = await deck.getStudyReportById(reportIdNo);

		if (!studyReport) {
			throw sendErrorJSON(res!, statusCodes.NotFound, 'Study Report not found');
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

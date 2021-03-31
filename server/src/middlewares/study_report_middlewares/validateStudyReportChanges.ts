import express from 'express';

import { sendErrorJSON, statusCodes, nil } from '../../utils';
import { Deck, User } from '../../database/entity';

function throwRedirect(res: express.Response) {
	res.set('Content-Type', 'application/json');
	res.status(statusCodes.NotModified).json({ message: 'Study Report is unchanged' });
}

export default async function validateStudyReportChanges(req: express.Request, res?: express.Response) {
	const { name, correct_count, start_time, end_time } = req.body;

	if (!name && !correct_count && !start_time && !end_time) {
		throw throwRedirect(res!);
	}

	try {
		const { deckId, reportId } = req.params;
		const deck = await Deck.findOneOrFail(deckId);
		const studyReport = await deck.getStudyReportById(Number(reportId));

		const areNamesSame = !name ? true : name === studyReport!.name;
		const areCorrectCountsSame = !correct_count ? true : correct_count === studyReport!.correct_count;
		const areStartTimesSame = !start_time ? true : start_time === studyReport!.start_time;
		const areEndTimesSame = !end_time ? true : end_time === studyReport!.end_time;

		if (areNamesSame && areCorrectCountsSame && areStartTimesSame && areEndTimesSame) {
			throw throwRedirect(res!);
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

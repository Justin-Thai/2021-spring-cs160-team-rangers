import express from 'express';

import { sendErrorJSON, statusCodes, nil } from '../../utils';
import { User } from '../../database/entity';

function throwRedirect(res: express.Response) {
	res.set('Content-Type', 'application/json');
	res.status(statusCodes.NotModified).json({ message: 'Study Report is unchanged' });
}

export default async function validateUserStudyReportChanges(req: express.Request, res?: express.Response) {
	const { name, correct_count, incorrect_count, start_time } = req.body;

	if (!name && !correct_count && !incorrect_count && !start_time) {
		throw throwRedirect(res!);
	}

	try {
		const { userId, reportId } = req.params;
		const user = await User.findOneOrFail(userId);
		const studyReport = await user.getUserStudyReportById(Number(reportId));

		const areNamesSame = !name ? true : name === studyReport!.name;
		const areCorrectCountsSame = !correct_count ? true : correct_count === studyReport!.correct_count;
		const areIncorrectCountsSame = !incorrect_count ? true : incorrect_count === studyReport!.incorrect_count;

		if (areNamesSame && areCorrectCountsSame && areIncorrectCountsSame) {
			throw throwRedirect(res!);
		}
	} catch (err) {
		if (err instanceof Error) {
			throw sendErrorJSON(res!, statusCodes.InternalServerError);
		}
		throw nil();
	}
}

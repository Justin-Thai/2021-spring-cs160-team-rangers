import {
	Path,
	GET,
	POST,
	PUT,
	DELETE,
	ServiceContext,
	Context,
	PathParam,
	FormParam,
	QueryParam,
	PreProcessor,
} from 'typescript-rest';

import { resOK, resError, statusCodes } from '../../utils';
import { User, Deck, Card, StudyReport } from '../../database/entity';
import {
	checkAuthentication,
	checkProfileAuthorization,
	checkIfDeckExists,
	checkIfCardExists,
	checkIfStudyReportExists,
	validateStudyReport,
	validateStudyReportChanges,
	validateUserStudyReportChanges,
} from '../../middlewares';

@Path('/profile/:userId')
export default class StudyReportService {
	@Context
	context: ServiceContext;

	@Path('/study')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	async getAllStudyReports(
		@PathParam('userId') userId: string,
		@QueryParam('name') name: string,
		@QueryParam('limit') limit: number,
		@QueryParam('page') page: number
	) {
		const res = this.context.response;
		try {
			if (name) {
				const user = await User.findOneOrFail(userId);
				const studyReports = await user.filterStudyReportByName(name, limit, page);
				res.status(statusCodes.OK);
				return resOK({ studyReports });
			}

			const user = await User.findOneOrFail(userId);
			const studyReports = await user.getUserStudyReports(limit, page);
			res.status(statusCodes.OK);
			return resOK({ studyReports });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	// Gets a specific study report from the user's study reports
	@Path('/study/:reportId')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfStudyReportExists)
	async getStudyReport(@PathParam('userId') userId: string, @PathParam('reportId') reportId: number) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			const studyReport = await user.getUserStudyReportById(reportId);
			res.status(statusCodes.OK);
			return resOK({ studyReport });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	// Updates a specific study report from the user's study reports
	@Path('/study/:reportId')
	@PUT
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfStudyReportExists)
	@PreProcessor(validateUserStudyReportChanges)
	async updateStudyReport(
		@PathParam('userId') userId: string,
		@PathParam('reportId') reportId: number,
		@FormParam('name') name: string,
		@FormParam('correct_count') correct_count: number,
		@FormParam('incorrect_count') incorrect_count: number
	) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			const studyReport = await user.getUserStudyReportById(reportId);

			if (name) {
				studyReport!.name = name;
			}

			if (correct_count) {
				studyReport!.correct_count = correct_count;
			}

			if (incorrect_count) {
				studyReport!.incorrect_count = incorrect_count;
			}

			await studyReport!.save();
			res.status(statusCodes.Created);
			return resOK({ studyReport });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	// Deletes a specific study report from the user's study reports
	@Path('study/:reportId')
	@DELETE
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfStudyReportExists)
	async deleteStudyReport(@PathParam('userId') userId: string, @PathParam('reportId') reportId: number) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			const studyReport = await user.getUserStudyReportById(reportId);
			const deckId = studyReport!.deck_id;
			const deck = await user.getDeckById(deckId);
			deck!.report_count--;
			await deck!.save();
			await studyReport!.remove();
			res.status(statusCodes.OK);
			return resOK({ message: `Successfully deleted study report ${reportId}` });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	// Gets all study reports from a specific deck
	@Path('/deck/:deckId/study')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	async getDeckStudyReports(
		@PathParam('deckId') deckId: number,
		@QueryParam('name') name: string,
		@QueryParam('limit') limit: number,
		@QueryParam('page') page: number
	) {
		const res = this.context.response;
		try {
			if (name) {
				const deck = await Deck.findOneOrFail(deckId);
				const studyReports = await deck.filterStudyReportByName(name, limit, page);
				res.status(statusCodes.OK);
				return resOK({ studyReports });
			}

			const deck = await Deck.findOneOrFail(deckId);
			const studyReports = await deck.getStudyReports(limit, page);
			res.status(statusCodes.OK);
			return resOK({ studyReports });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	// Gets a specfic study report from a specific deck
	@Path('/deck/:deckId/study/:reportId')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfStudyReportExists)
	async getDeckStudyReport(@PathParam('deckId') deckId: number, @PathParam('reportId') sessionId: number) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const studyReport = (await deck.getStudyReportById(sessionId)) as StudyReport;
			res.status(statusCodes.OK);
			return resOK({ studyReport });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/study')
	@POST
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(validateStudyReport)
	async createStudyReport(@PathParam('userId') userId: string, @PathParam('deckId') deckId: number) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const name = deck.name + ' Study Report';
			const newStudyReport = new StudyReport(userId, deckId, name);
			deck.report_count++;
			await newStudyReport.save();
			await deck.save();
			res.status(statusCodes.Created);
			return resOK({ studyReport: newStudyReport });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	// Updates a specfic study report from a specific deck
	@Path('/deck/:deckId/study/:reportId')
	@PUT
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfStudyReportExists)
	@PreProcessor(validateStudyReportChanges)
	async updateDeckStudyReport(
		@PathParam('userId') userId: string,
		@PathParam('deckId') deckId: number,
		@PathParam('reportId') reportId: number,
		@FormParam('name') name: string,
		@FormParam('correct_count') correct_count: number,
		@FormParam('incorrect_count') incorrect_count: number
	) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const studyReport = await deck.getStudyReportById(reportId);

			if (name) {
				studyReport!.name = name;
			}

			if (correct_count) {
				studyReport!.correct_count = correct_count;
			}

			if (incorrect_count) {
				studyReport!.incorrect_count = incorrect_count;
			}

			await studyReport!.save();
			res.status(statusCodes.Created);
			return resOK({ studyReport });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	// Updates end time
	@Path('/deck/:deckId/study/:reportId/end')
	@PUT
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfStudyReportExists)
	async updateEndTimeStudyReport(@PathParam('deckId') deckId: number, @PathParam('reportId') reportId: number) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const studyReport = (await deck.getStudyReportById(reportId)) as StudyReport;
			studyReport.end_time = new Date();
			await studyReport.save();
			res.status(statusCodes.Created);
			return resOK({ studyReport });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	// Deletes a specfic study report from a specific deck
	@Path('/deck/:deckId/study/:reportId')
	@DELETE
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfStudyReportExists)
	async deleteDeckStudyReport(@PathParam('deckId') deckId: string, @PathParam('reportId') reportId: number) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const studyReport = await deck.getStudyReportById(reportId);
			deck!.report_count--;
			await deck!.save();
			await studyReport!.remove();
			res.status(statusCodes.OK);
			return resOK({ message: `Successfully deleted study report ${reportId}` });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/study/:reportId/:cardId')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfStudyReportExists)
	@PreProcessor(checkIfCardExists)
	async getFrontSide(
		@PathParam('deckId') deckId: number,
		@PathParam('reportId') reportId: number,
		@PathParam('cardId') cardId: number
	) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const card = (await deck.getCardById(cardId)) as Card;
			const front_side = card.front_side;
			res.status(statusCodes.OK);
			return resOK({ front_side });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/study/:reportId/:cardId')
	@POST
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfStudyReportExists)
	@PreProcessor(checkIfCardExists)
	async answerBackSide(
		@PathParam('deckId') deckId: number,
		@PathParam('reportId') reportId: number,
		@PathParam('cardId') cardId: number,
		@FormParam('answer') answer: string
	) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const studyReport = await deck.getStudyReportById(reportId);
			const card = (await deck.getCardById(cardId)) as Card;
			const back_side = card.back_side;

			if (answer === back_side) {
				// user answered card correctly
				studyReport!.correct_count++;
				card!.correct_count++;
			} else {
				// user answered card incorrectly
				studyReport!.incorrect_count++;
				card!.incorrect_count++;
			}

			await studyReport!.save();
			await card!.save();
			res.status(statusCodes.OK);
			return resOK({ card });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
}

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

import { resOK, resError, sendErrorJSON, statusCodes } from '../../utils';
import { User, Deck, Card, StudyReport } from '../../database/entity';
import {
	checkAuthentication,
	checkProfileAuthorization,
	validateDeck,
	validateDeckChanges,
	validateCard,
	validateCardChanges,
	checkIfDeckExists,
	checkIfCardExists,
	checkIfStudyReportExists,
	validateStudyReport,
	validateStudyReportChanges,
	validateUserStudyReportChanges,
} from '../../middlewares';

@Path('/profile/:userId')
export default class ProfileService {
	@Context
	context: ServiceContext;

	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	async getProfile(@PathParam('userId') userId: string) {
		const res = this.context.response;
		try {
			const user = await User.findOne(userId);

			if (!user) {
				return sendErrorJSON(res, statusCodes.NotFound, 'User not found');
			}

			res.status(statusCodes.OK);
			return resOK({ user: { id: user.id, email: user.email, name: user.name, deck_count: user.deck_count } });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	/**----------------------------------Deck Methods---------------------------------- */

	@Path('/deck')
	@POST
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(validateDeck)
	async createDeck(
		@PathParam('userId') userId: string,
		@FormParam('name') name: string,
		@FormParam('shared') shared: boolean
	) {
		const res = this.context.response;
		try {
			const newDeck = new Deck(userId, name, shared);
			await newDeck.save();
			const user = await User.findOneOrFail(userId);
			user.deck_count += 1;
			await user.save();
			res.status(statusCodes.Created);
			return resOK({ deck: newDeck });
		} catch (err) {
			console.log(err);
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	async getAllDecks(
		@PathParam('userId') userId: string,
		@QueryParam('name') name: string,
		@QueryParam('limit') limit: number,
		@QueryParam('page') page: number
	) {
		const res = this.context.response;
		try {
			if (limit === undefined) {
				limit = 9;
			}
			if (page === undefined) {
				page = 1;
			}

			if (name) {
				const user = await User.findOneOrFail(userId);
				const decks = await user.filterDeckByName(name, limit, page);
				res.status(statusCodes.OK);
				return resOK({ decks });
			}

			const user = await User.findOneOrFail(userId);
			const decks = await user.getDecks(limit, page);
			res.status(statusCodes.OK);
			return resOK({ decks });
		} catch (err) {
			console.log(err);
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	async getDeck(@PathParam('userId') userId: string, @PathParam('deckId') deckId: number) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			const deck = await user.getDeckById(deckId);
			res.status(statusCodes.OK);
			return resOK({ deck });
		} catch (err) {
			console.log(err);
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId')
	@PUT
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(validateDeckChanges)
	async updateDeck(
		@PathParam('userId') userId: string,
		@PathParam('deckId') deckId: number,
		@FormParam('name') name: string,
		@FormParam('shared') sharedValueInString: string
	) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			const deck = await user.getDeckById(deckId);

			if (name) {
				deck!.name = name;
			}
			if (sharedValueInString !== undefined) {
				deck!.shared = Boolean(JSON.parse(sharedValueInString));
			}

			await deck!.save();
			res.status(statusCodes.OK);
			return resOK({ deck });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId')
	@DELETE
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	async deleteDeck(@PathParam('userId') userId: string, @PathParam('deckId') deckId: number) {
		const res = this.context.response;
		try {
			const user = await User.findOneOrFail(userId);
			await Deck.delete(deckId);
			user.deck_count -= 1;
			await user.save();
			res.status(statusCodes.OK);
			return resOK({ message: `Successfully deleted deck ${deckId}` });
		} catch (err) {
			console.log(err)
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	/**----------------------------------End Deck Methods---------------------------------- */

	/**----------------------------------Card Methods---------------------------------- */

	@Path('/deck/:deckId/card')
	@POST
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(validateCard)
	async createCard(
		@PathParam('deckId') deckId: number,
		@FormParam('front_side') front_side: string,
		@FormParam('back_side') back_side: string
	) {
		const res = this.context.response;
		try {
			const newCard = new Card(deckId, front_side, back_side);
			const deck = await Deck.findOneOrFail(deckId);
			deck.card_count += 1;
			await newCard.save();
			await deck.save();
			res.status(statusCodes.Created);
			return resOK({ card: newCard });
		} catch (err) {
			console.log(err);
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/card')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	async getAllCards(
		@PathParam('deckId') deckId: number,
		@QueryParam('front') front_side: string,
		@QueryParam('back') back_side: string
	) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);

			if (front_side || back_side) {
				const cards = await deck.filterCard(front_side, back_side);
				res.status(statusCodes.OK);
				return resOK({ cards });
			}

			const cards = await deck.getCards();
			res.status(statusCodes.OK);
			return resOK({ cards });
		} catch (err) {
			console.log(err);
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/card/:cardId')
	@GET
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfCardExists)
	async getCard(@PathParam('deckId') deckId: number, @PathParam('cardId') cardId: number) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const card = await deck.getCardById(cardId);
			res.status(statusCodes.OK);
			return resOK({ card });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/card/:cardId')
	@PUT
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfCardExists)
	@PreProcessor(validateCardChanges)
	async updateCard(
		@PathParam('deckId') deckId: number,
		@PathParam('cardId') cardId: number,
		@FormParam('front_side') front_side: string,
		@FormParam('back_side') back_side: string
	) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const card = await deck.getCardById(cardId);

			if (front_side) {
				card!.front_side = front_side;
			}

			if (back_side) {
				card!.back_side = back_side;
			}

			await card!.save();
			res.status(statusCodes.OK);
			return resOK({ card });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}

	@Path('/deck/:deckId/card/:cardId')
	@DELETE
	@PreProcessor(checkAuthentication)
	@PreProcessor(checkProfileAuthorization)
	@PreProcessor(checkIfDeckExists)
	@PreProcessor(checkIfCardExists)
	async deleteCard(@PathParam('deckId') deckId: string, @PathParam('cardId') cardId: number) {
		const res = this.context.response;
		try {
			const deck = await Deck.findOneOrFail(deckId);
			const card = await deck.getCardById(cardId);
			deck!.card_count -= 1;
			await deck!.save();
			await card!.remove();
			res.status(statusCodes.OK);
			return resOK({ message: `Successfully deleted card ${cardId}` });
		} catch (err) {
			res.status(statusCodes.InternalServerError);
			return resError();
		}
	}
	/**----------------------------------End Card Methods---------------------------------- */

	/**----------------------------------Study Report Methods---------------------------------- */

	// Gets all study reports from the user (regardless of decks)
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
			console.log(err);
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
			console.log(err);
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
			const studyReport = await deck.getStudyReportById(sessionId);
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
			console.log(err);
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
			const card = await deck.getCardById(cardId);
			const front_side = card!.front_side;
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
			const card = await deck.getCardById(cardId);
			const back_side = card!.back_side;

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
	/**----------------------------------End Study Report Methods---------------------------------- */
}

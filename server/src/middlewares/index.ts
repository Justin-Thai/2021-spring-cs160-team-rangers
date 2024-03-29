import checkAuthentication from './auth_middlewares/checkAuthentication';
import validateUser from './auth_middlewares/validateUser';
import checkIfEmailUsed from './auth_middlewares/checkIfEmailUsed';
import checkIfUserExists from './auth_middlewares/checkIfUserExists';
import checkPassword from './auth_middlewares/checkPassword';
import checkProfileAuthorization from './auth_middlewares/checkProfileAuthorization';
import validateDeck from './deck_middlewares/validateDeck';
import validateCard from './card_middlewares/validateCard';
import validateStudyReport from './study_report_middlewares/validateStudyReport';
import checkIfDeckExists from './deck_middlewares/checkIfDeckExists';
import checkIfCardExists from './card_middlewares/checkIfCardExists';
import checkIfStudyReportExists from './study_report_middlewares/checkIfStudyReportExists';
import validateDeckChanges from './deck_middlewares/validateDeckChanges';
import validateCardChanges from './card_middlewares/validateCardChanges';
import validateStudyReportChanges from './study_report_middlewares/validateStudyReportChanges';
import validateUserStudyReportChanges from './study_report_middlewares/validateUserStudyReportChanges'

export {
	checkAuthentication,
	validateUser,
	checkIfEmailUsed,
	checkIfUserExists,
	checkPassword,
	checkProfileAuthorization,
	validateDeck,
	validateCard,
	validateStudyReport,
	checkIfDeckExists,
	checkIfCardExists,
	checkIfStudyReportExists,
	validateDeckChanges,
	validateCardChanges,
	validateStudyReportChanges,
	validateUserStudyReportChanges
};

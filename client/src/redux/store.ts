import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './auth/reducer';
import notFoundPageDetectorReducer from './not_found_page_detector/reducer';
import deckReducer from './deck/reducer';
import studyReportReducer from './study_report/reducer';
import cardReducer from './card/reducer';
import { NotFoundPageDetectorState } from './not_found_page_detector/types';
import { AuthState } from './auth/types';
import { DeckState } from './deck/types';
import { StudyReportState } from './study_report/types';
import { CardState } from './card/types';

const rootReducer = combineReducers({
	auth: authReducer,
	deck: deckReducer,
	card: cardReducer,
	studyReport: studyReportReducer,
	notFoundPageDetector: notFoundPageDetectorReducer,
});

export type AppState = {
	auth: AuthState;
	deck: DeckState;
	card: CardState;
	studyReport: StudyReportState;
	notFoundPageDetector: NotFoundPageDetectorState;
};

export default createStore(rootReducer, compose(applyMiddleware(thunk)));

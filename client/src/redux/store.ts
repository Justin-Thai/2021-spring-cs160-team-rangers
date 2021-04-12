import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './auth/reducer';
import notFoundPageDetectorReducer from './not_found_page_detector/reducer';
import deckReducer from './deck/reducer';
import cardReducer from './card/reducer';
import { NotFoundPageDetectorState } from './not_found_page_detector/types';
import { AuthState } from './auth/types';
import { DeckState } from './deck/types';
import { CardState } from './card/types';

const rootReducer = combineReducers({
	auth: authReducer,
	deck: deckReducer,
	card: cardReducer,
	notFoundPageDetector: notFoundPageDetectorReducer,
});

export type AppState = {
	auth: AuthState;
	deck: DeckState;
	card: CardState;
	notFoundPageDetector: NotFoundPageDetectorState;
};

export default createStore(rootReducer, compose(applyMiddleware(thunk)));

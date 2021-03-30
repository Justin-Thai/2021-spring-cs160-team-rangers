import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './auth/reducer';
import notFoundPageDetectorReducer from './not_found_page_detector/reducer';
import { NotFoundPageDetectorState } from './not_found_page_detector/types';
import { AuthState } from './auth/types';

const rootReducer = combineReducers({
	auth: authReducer,
	notFoundPageDetector: notFoundPageDetectorReducer,
});

export type AppState = {
	auth: AuthState;
	notFoundPageDetector: NotFoundPageDetectorState;
};

export default createStore(rootReducer, compose(applyMiddleware(thunk)));

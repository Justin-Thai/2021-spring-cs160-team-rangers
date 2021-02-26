import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './auth/reducer';
import { AuthState } from './auth/types';

const rootReducer = combineReducers({
	auth: authReducer,
});

export type AppState = {
	auth: AuthState;
};

export default createStore(rootReducer, compose(applyMiddleware(thunk)));

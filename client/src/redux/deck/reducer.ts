import { DeckAction, DeckState, DispatchTypes } from './types';
import { Deck } from '../../models';

const initialState: DeckState = {
	decks: [],
	loadings: {
		fetchDecksLoading: false,
		createDeckLoading: false,
	},
	errors: {
		fetchDecksError: null,
		createDeckError: null,
	},
};

export default function deckReducer(state = initialState, action: DeckAction): DeckState {
	switch (action.type) {
		case DispatchTypes.FETCH_DECKS_STARTED: {
			const newState = { ...state };
			newState.loadings.fetchDecksLoading = true;
			newState.errors.fetchDecksError = null;
			return newState;
		}
		case DispatchTypes.FETCH_DECKS_SUCCESS: {
			const newState = { ...state };
			const payload = action.payload as Deck[];
			newState.loadings.fetchDecksLoading = false;
			newState.decks = payload;
			newState.errors.fetchDecksError = null;
			return newState;
		}
		case DispatchTypes.FETCH_DECKS_FAILURE: {
			const newState = { ...state };
			const payload = action.payload as Error;
			newState.loadings.fetchDecksLoading = false;
			newState.decks = [];
			newState.errors.fetchDecksError = payload;
			return newState;
		}
		case DispatchTypes.CREATE_DECK_STARTED: {
			const newState = { ...state };
			newState.loadings.createDeckLoading = true;
			newState.errors.createDeckError = null;
			return newState;
		}
		case DispatchTypes.CREATE_DECK_SUCCESS: {
			const newState = { ...state };
			const payload = action.payload as Deck;
			newState.loadings.createDeckLoading = false;
			newState.decks = [payload, ...newState.decks];
			return newState;
		}
		case DispatchTypes.CREATE_DECK_FAILURE: {
			const newState = { ...state };
			const payload = action.payload as Error;
			newState.loadings.createDeckLoading = false;
			newState.errors.createDeckError = payload;
			return newState;
		}
		case DispatchTypes.CLEAR_ERRORS: {
			const newState = { ...state };
			newState.errors.createDeckError = null;
			newState.errors.fetchDecksError = null;
			return newState;
		}
		default:
			return state;
	}
}

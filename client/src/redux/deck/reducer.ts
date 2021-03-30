import { DeckAction, DeckState, DispatchTypes } from './types';
import { Deck } from '../../models';

const initialState: DeckState = {
	decks: [],
	loading: false,
	error: null,
};

export default function deckReducer(state = initialState, action: DeckAction): DeckState {
	switch (action.type) {
		case DispatchTypes.FETCH_DECKS_STARTED: {
			const newState = { ...state };
			newState.loading = true;
			newState.error = null;
			return newState;
		}
		case DispatchTypes.FETCH_DECKS_SUCCESS: {
			const newState = { ...state };
			const payload = action.payload as Deck[];
			newState.loading = false;
			newState.decks = payload;
			newState.error = null;
			return newState;
		}
		case DispatchTypes.FETCH_DECKS_FAILURE: {
			const newState = { ...state };
			const payload = action.payload as Error;
			newState.loading = false;
			newState.decks = [];
			newState.error = payload;
			return newState;
		}
		default:
			return state;
	}
}

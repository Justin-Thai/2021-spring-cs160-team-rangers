import { DeckAction, DeckState, DispatchTypes } from './types';
import { Deck } from '../../models';

const initialState: DeckState = {
	decks: [],
	loadings: {
		fetchDecksLoading: false,
		createDeckLoading: false,
		editDeckLoading: false,
		deleting: '',
	},
	errors: {
		fetchDecksError: null,
		createDeckError: null,
		editDeckError: null,
		deleteDeckError: null,
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
		case DispatchTypes.EDIT_DECK_STARTED: {
			const newState = { ...state };
			newState.loadings.editDeckLoading = true;
			newState.errors.editDeckError = null;
			return newState;
		}
		case DispatchTypes.EDIT_DECK_SUCCESS: {
			const newState = { ...state };
			newState.loadings.editDeckLoading = false;
			return newState;
		}
		case DispatchTypes.EDIT_DECK_FAILURE: {
			const newState = { ...state };
			const payload = action.payload as Error;
			newState.loadings.editDeckLoading = false;
			newState.errors.editDeckError = payload;
			return newState;
		}
		case DispatchTypes.DELETE_DECK_STARTED: {
			const newState = { ...state };
			newState.loadings.deleting = action.payload as string;
			newState.errors.deleteDeckError = null;
			return newState;
		}
		case DispatchTypes.DELETE_DECK_SUCCESS: {
			const newState = { ...state };
			const payload = action.payload as string;
			console.log('delete', payload);
			newState.loadings.deleting = '';
			newState.decks = [...newState.decks.filter((deck) => deck.id !== payload)];
			return newState;
		}
		case DispatchTypes.DELETE_DECK_FAILURE: {
			const newState = { ...state };
			const payload = action.payload as Error;
			newState.loadings.deleting = '';
			newState.errors.deleteDeckError = payload;
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

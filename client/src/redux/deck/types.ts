import { Deck } from '../../models/';

export enum DispatchTypes {
	FETCH_DECKS_STARTED = 'FETCH_DECKS_STARTED',
	FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS',
	FETCH_DECKS_FAILURE = 'FETCH_DECKS_FAILURE',

	CREATE_DECK_STARTED = 'CREATE_DECK_STARTED',
	CREATE_DECK_SUCCESS = 'CREATE_DECK_SUCCESS',
	CREATE_DECK_FAILURE = 'CREATE_DECK_FAILURE',

	EDIT_DECK_STARTED = 'EDIT_DECK_STARTED',
	EDIT_DECK_SUCCESS = 'EDIT_DECK_SUCCESS',
	EDIT_DECK_FAILURE = 'EDIT_DECK_FAILURE',

	DELETE_DECK_STARTED = 'DELETE_DECK_STARTED',
	DELETE_DECK_SUCCESS = 'DELETE_DECK_SUCCESS',
	DELETE_DECK_FAILURE = 'DELETE_DECK_FAILURE',

	CLEAR_ERRORS = 'CLEAR_ERRORS',
}

export type DeckAction = {
	type: string;
	payload: Deck[] | Deck | string | Error | null;
};

export type DeckState = {
	decks: Deck[];
	loadings: {
		fetchDecksLoading: boolean;
		createDeckLoading: boolean;
		editDeckLoading: boolean;
		deleting: string;
	}
	errors: {
		fetchDecksError: Error | null;
		createDeckError: Error | null;
		editDeckError: Error | null;
		deleteDeckError: Error | null;
	}
};

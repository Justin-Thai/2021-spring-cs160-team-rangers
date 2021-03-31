import { Deck } from '../../models/';

export enum DispatchTypes {
	FETCH_DECKS_STARTED = 'FETCH_DECKS_STARTED',
	FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS',
	FETCH_DECKS_FAILURE = 'FETCH_DECKS_FAILURE',

	CREATE_DECK_STARTED = 'CREATE_DECK_STARTED',
	CREATE_DECK_SUCCESS = 'CREATE_DECK_SUCCESS',
	CREATE_DECK_FAILURE = 'CREATE_DECK_FAILURE',

	CLEAR_ERRORS = 'CLEAR_ERRORS',
}

export type DeckAction = {
	type: string;
	payload: Deck[] | Deck | Error | null;
};

export type DeckState = {
	decks: Deck[];
	loadings: {
		fetchDecksLoading: boolean;
		createDeckLoading: boolean;
	}
	errors: {
		fetchDecksError: Error | null;
		createDeckError: Error | null;
	}
};

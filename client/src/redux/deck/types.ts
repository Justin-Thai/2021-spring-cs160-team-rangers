import { Deck } from '../../models/';

export enum DispatchTypes {
	FETCH_DECKS_STARTED = 'FETCH_DECKS_STARTED',
	FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS',
	FETCH_DECKS_FAILURE = 'FETCH_DECKS_FAILURE',
}

export type DeckAction = {
	type: string;
	payload: Deck[] | Error | null;
};

export type DeckState = {
	decks: Deck[];
	loading: boolean;
	error: Error | null;
};

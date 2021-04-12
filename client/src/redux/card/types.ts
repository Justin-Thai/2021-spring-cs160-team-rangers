import { Card } from '../../models';

export enum DispatchTypes {
	FETCH_CARDS_STARTED = 'FETCH_CARDS_STARTED',
	FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS',
	FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE',

	CREATE_CARD_STARTED = 'CREATE_CARD_STARTED',
	CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS',
	CREATE_CARD_FAILURE = 'CREATE_CARD_FAILURE',

	EDIT_CARD_STARTED = 'EDIT_CARD_STARTED',
	EDIT_CARD_SUCCESS = 'EDIT_CARD_SUCCESS',
	EDIT_CARD_FAILURE = 'EDIT_CARD_FAILURE',

	DELETE_CARD_STARTED = 'DELETE_CARD_STARTED',
	DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS',
	DELETE_CARD_FAILURE = 'DELETE_CARD_FAILURE',

	CLEAR_ERRORS = 'CLEAR_ERRORS',
}

export type CardAction = {
	type: string;
	payload: Card[] | Card | string | Error | null;
};

export type CardState = {
	cards: Card[];
	loadings: {
		fetchCardsLoading: boolean;
		createCardLoading: boolean;
		editCardLoading: boolean;
		deleting: string;
	}
	errors: {
		fetchCardsError: Error | null;
		createCardError: Error | null;
		editCardError: Error | null;
		deleteCardError: Error | null;
	}
};

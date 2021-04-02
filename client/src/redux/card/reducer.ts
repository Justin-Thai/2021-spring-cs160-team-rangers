import { CardAction, CardState, DispatchTypes } from './types';
import { Card } from '../../models';

const initialState: CardState = {
	cards: [],
	loadings: {
		fetchCardsLoading: false,
		createCardLoading: false,
		editCardLoading: false,
		deleting: '',
	},
	errors: {
		fetchCardsError: null,
		createCardError: null,
		editCardError: null,
		deleteCardError: null,
	},
};

export default function cardReducer(state = initialState, action: CardAction): CardState {
	switch (action.type) {
		case DispatchTypes.FETCH_CARDS_STARTED: {
			const newState = { ...state };
			newState.loadings.fetchCardsLoading = true;
			newState.errors.fetchCardsError = null;
			return newState;
		}
		case DispatchTypes.FETCH_CARDS_SUCCESS: {
			const newState = { ...state };
			const payload = action.payload as Card[];
			newState.loadings.fetchCardsLoading = false;
			newState.cards = payload;
			return newState;
		}
		case DispatchTypes.FETCH_CARDS_FAILURE: {
			const newState = { ...state };
			const payload = action.payload as Error;
			newState.loadings.fetchCardsLoading = false;
			newState.cards = [];
			newState.errors.fetchCardsError = payload;
			return newState;
		}
		case DispatchTypes.CREATE_CARD_STARTED: {
			const newState = { ...state };
			newState.loadings.createCardLoading = true;
			newState.errors.createCardError = null;
			return newState;
		}
		case DispatchTypes.CREATE_CARD_SUCCESS: {
			const newState = { ...state };
			const payload = action.payload as Card;
			newState.loadings.createCardLoading = false;
			newState.cards = [payload, ...newState.cards];
			return newState;
		}
		case DispatchTypes.CREATE_CARD_FAILURE: {
			const newState = { ...state };
			const payload = action.payload as Error;
			newState.loadings.createCardLoading = false;
			newState.errors.createCardError = payload;
			return newState;
		}
		case DispatchTypes.CLEAR_ERRORS: {
			const newState = { ...state };
			newState.errors.createCardError = null;
			newState.errors.fetchCardsError = null;
			newState.errors.editCardError = null;
			newState.errors.deleteCardError = null;
			return newState;
		}
		default:
			return state;
	}
}

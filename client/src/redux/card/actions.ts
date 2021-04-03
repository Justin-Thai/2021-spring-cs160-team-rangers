import { env } from '../../config/';
import { Card } from '../../models';
import { delay, toReadableTime } from '../../utils';
import { AppState } from '../store';
import { DispatchTypes, CardAction } from './types';

export const fetchCards = (deckId: string) => async (
	dispatch: (action: CardAction) => void,
	getState: () => AppState
) => {
	dispatch(fetchCardsStarted());
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;
		const res = await fetch(`${env.serverUrl}/profile/${user!.id}/deck/${deckId}/card`, {
			method: 'GET',
			headers: {
				token,
			},
		});

		const data = await res.json();
		if (res.status !== 200) {
			throw new Error(data.message);
		}

		const cards: Card[] = data.cards.map((c: any) => ({
			id: String(c.id),
			createdDate: toReadableTime(c.updated_at),
			frontSide: c.front_side,
			backSide: c.back_side,
		}));

		await delay(600);

		dispatch(fetchCardsSuccess(cards));
	} catch (err) {
		dispatch(fetchCardsFailure(err));
	}
};

export const createCard = (deckId: string, front: string, back: string) => async (
	dispatch: (action: CardAction) => void,
	getState: () => AppState
) => {
	dispatch(createCardStarted());
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;
		const res = await fetch(`${env.serverUrl}/profile/${user!.id}/deck/${deckId}/card`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token,
			},
			body: JSON.stringify({ front_side: front, back_side: back }),
		});

		const data = await res.json();

		if (res.status !== 201) {
			throw new Error(data.message);
		}

		await delay(600);

		const newCard = {
			id: data.card.id,
			createdDate: toReadableTime(data.card.created_at),
			frontSide: data.card.front_side,
			backSide: data.card.back_side,
		};
		dispatch(createCardSuccess(newCard));
	} catch (err) {
		dispatch(createCardFailure(err));
	}
};

export const editCard = (deckId: string, cardId: string, front: string, back: string) => async (
	dispatch: (action: CardAction) => void,
	getState: () => AppState
) => {
	dispatch(editCardStarted());
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;
		const res = await fetch(`${env.serverUrl}/profile/${user!.id}/deck/${deckId}/card/${cardId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token,
			},
			body: JSON.stringify({ front_side: front, back_side: back }),
		});

		const data = await res.json();

		if (res.status !== 200) {
			throw new Error(data.message);
		}

		await delay(600);

		dispatch(editCardSuccess());
	} catch (err) {
		dispatch(editCardFailure(err));
	}
};

export const clearErrors = () => ({
	type: DispatchTypes.CLEAR_ERRORS,
	payload: null,
});

/* ------------------ action dispatches ------------------ */

const fetchCardsStarted = (): CardAction => ({
	type: DispatchTypes.FETCH_CARDS_STARTED,
	payload: null,
});

const fetchCardsSuccess = (cards: Card[]): CardAction => ({
	type: DispatchTypes.FETCH_CARDS_SUCCESS,
	payload: cards,
});

const fetchCardsFailure = (error: Error): CardAction => ({
	type: DispatchTypes.FETCH_CARDS_FAILURE,
	payload: error,
});

const createCardStarted = (): CardAction => ({
	type: DispatchTypes.CREATE_CARD_STARTED,
	payload: null,
});

const createCardSuccess = (deck: Card): CardAction => ({
	type: DispatchTypes.CREATE_CARD_SUCCESS,
	payload: deck,
});

const createCardFailure = (error: Error): CardAction => ({
	type: DispatchTypes.CREATE_CARD_FAILURE,
	payload: error,
});

const editCardStarted = (): CardAction => ({
	type: DispatchTypes.EDIT_CARD_STARTED,
	payload: null,
});

const editCardSuccess = (): CardAction => ({
	type: DispatchTypes.EDIT_CARD_SUCCESS,
	payload: null,
});

const editCardFailure = (error: Error): CardAction => ({
	type: DispatchTypes.EDIT_CARD_FAILURE,
	payload: error,
});

const deleteCardStarted = (deckId: string): CardAction => ({
	type: DispatchTypes.DELETE_CARD_STARTED,
	payload: deckId,
});

const deleteCardSuccess = (deckId: string): CardAction => ({
	type: DispatchTypes.DELETE_CARD_SUCCESS,
	payload: deckId,
});

const deleteCardFailure = (error: Error): CardAction => ({
	type: DispatchTypes.DELETE_CARD_FAILURE,
	payload: error,
});

import { DispatchTypes, DeckAction } from './types';
import { AuthAction } from '../auth/types';
import { Deck } from '../../models';
import { delay, toReadableTime } from '../../utils';
import { incrementDeckCount } from '../auth/actions';
import { env } from '../../config';
import { AppState } from '../store';

export const fetchDecks = (name = '', page = 1) => async (
	dispatch: (action: DeckAction) => void,
	getState: () => AppState
) => {
	dispatch(fetchDecksStarted());
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;
		const res = await fetch(
			`${env.serverUrl}/profile/${user!.id}/deck?name=${name}&limit=${env.decksPerPage}&page=${page}`,
			{
				method: 'GET',
				headers: {
					token,
				},
			}
		);

		const data = await res.json();
		if (res.status !== 200) {
			throw new Error(data.message);
		}

		const decks = data.decks.map((d: any) => ({
			id: String(d.id),
			name: d.name,
			updatedDate: toReadableTime(d.updated_at),
			cardCount: d.count,
		}));

		await delay(600);

		dispatch(fetchDecksSuccess(decks));
	} catch (err) {
		dispatch(fetchDecksFailure(err));
	}
};

export const createDeck = (name: string) => async (
	dispatch: (action: DeckAction | AuthAction) => void,
	getState: () => AppState
) => {
	dispatch(createDeckStarted());
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;
		const res = await fetch(`${env.serverUrl}/profile/${user!.id}/deck`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token,
			},
			body: JSON.stringify({ name }),
		});

		const data = await res.json();
		if (res.status !== 201) {
			throw new Error(data.message);
		}

		await delay(1000);

		const newDeck = {
			id: data.deck.id,
			name: data.deck.name,
			updatedDate: toReadableTime(data.deck.updated_at),
			cardCount: data.deck.count,
		};

		dispatch(incrementDeckCount());
		dispatch(createDeckSuccess(newDeck));
	} catch (err) {
		dispatch(createDeckFailure(err));
	}
};

export const clearErrors = () => ({
	type: DispatchTypes.CLEAR_ERRORS,
	payload: null,
});

/* ------------------ action dispatches ------------------ */

const fetchDecksStarted = (): DeckAction => ({
	type: DispatchTypes.FETCH_DECKS_STARTED,
	payload: null,
});

const fetchDecksSuccess = (decks: Deck[]): DeckAction => ({
	type: DispatchTypes.FETCH_DECKS_SUCCESS,
	payload: decks,
});

const fetchDecksFailure = (error: Error): DeckAction => ({
	type: DispatchTypes.FETCH_DECKS_FAILURE,
	payload: error,
});

const createDeckStarted = (): DeckAction => ({
	type: DispatchTypes.CREATE_DECK_STARTED,
	payload: null,
});

const createDeckSuccess = (deck: Deck): DeckAction => ({
	type: DispatchTypes.CREATE_DECK_SUCCESS,
	payload: deck,
});

const createDeckFailure = (error: Error): DeckAction => ({
	type: DispatchTypes.CREATE_DECK_FAILURE,
	payload: error,
});

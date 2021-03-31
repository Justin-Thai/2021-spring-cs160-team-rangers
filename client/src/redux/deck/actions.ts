import { DispatchTypes, DeckAction } from './types';
import { Deck } from '../../models';
import { delay, toReadableTime } from '../../utils';
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
			return dispatch(fetchDecksSuccess([]));
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

		if (res.status !== 200) {
			return dispatch(fetchDecksSuccess([]));
		}

		const data = await res.json();

		const decks = data.decks.map((d: any) => ({
			id: String(d.id),
			name: d.name,
			updatedDate: toReadableTime(d.updated_at),
			cardCount: d.count,
		}));

		await delay(1000);

		dispatch(fetchDecksSuccess(decks));
	} catch (err) {
		dispatch(fetchDecksFailure(err));
	}
};

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

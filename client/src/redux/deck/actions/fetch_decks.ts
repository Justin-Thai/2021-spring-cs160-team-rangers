import { env } from '../../../config';
import { Deck } from '../../../models';
import { delay, toReadableTime } from '../../../utils';
import { AppState } from '../../store';
import { DeckAction, DispatchTypes } from '../types';

const fetchDecks = (name = '', page = 1) => async (
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

		const decks: Deck[] = data.decks.map((d: any) => ({
			id: String(d.id),
			name: d.name,
			updatedDate: toReadableTime(d.updated_at),
			cardCount: d.card_count,
			reportCount: d.report_count,
			shared: Boolean(d.shared),
		}));

		await delay(400);

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

export default fetchDecks;

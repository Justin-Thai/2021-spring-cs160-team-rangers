import { env } from '../../../config';
import { Deck } from '../../../models';
import { delay, toReadableTime } from '../../../utils';
import { incrementDeckCount } from '../../auth/actions';
import { AuthAction } from '../../auth/types';
import { AppState } from '../../store';
import { DeckAction, DispatchTypes } from '../types';

const createDeck = (name: string, shared = false) => async (
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
			body: JSON.stringify({ name, shared: String(shared) }),
		});

		const data = await res.json();
		if (res.status !== 201) {
			throw new Error(data.message);
		}

		await delay(600);

		const newDeck = {
			id: data.deck.id,
			name: data.deck.name,
			updatedDate: toReadableTime(data.deck.updated_at),
			cardCount: data.deck.count,
			shared: false,
		};

		dispatch(incrementDeckCount());
		dispatch(createDeckSuccess(newDeck));
	} catch (err) {
		dispatch(createDeckFailure(err));
	}
};

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

export default createDeck;

import { env } from '../../../config';
import { delay } from '../../../utils';
import { decrementDeckCount } from '../../auth/actions';
import { AuthAction } from '../../auth/types';
import { AppState } from '../../store';
import { DeckAction, DispatchTypes } from '../types';

const deleteDeck = (deckId: string) => async (
	dispatch: (action: DeckAction | AuthAction) => void,
	getState: () => AppState
) => {
	dispatch(deleteDeckStarted(deckId));
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;
		const res = await fetch(`${env.serverUrl}/profile/${user!.id}/deck/${deckId}`, {
			method: 'DELETE',
			headers: {
				token,
			},
		});

		if (res.status !== 200) {
			const data = await res.json();
			throw new Error(data.message);
		}

		dispatch(decrementDeckCount());
		dispatch(deleteDeckSuccess(deckId));
	} catch (err) {
		dispatch(deleteDeckFailure(err));
	}
};

const deleteDeckStarted = (deckId: string): DeckAction => ({
	type: DispatchTypes.DELETE_DECK_STARTED,
	payload: deckId,
});

const deleteDeckSuccess = (deckId: string): DeckAction => ({
	type: DispatchTypes.DELETE_DECK_SUCCESS,
	payload: deckId,
});

const deleteDeckFailure = (error: Error): DeckAction => ({
	type: DispatchTypes.DELETE_DECK_FAILURE,
	payload: error,
});

export default deleteDeck;

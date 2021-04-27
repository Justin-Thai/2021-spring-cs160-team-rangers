import { env } from '../../../config';
import { delay } from '../../../utils';
import { AppState } from '../../store';
import { DeckAction, DispatchTypes } from '../types';

const editDeck = (deckId: string, newName: string, newShared: boolean) => async (
	dispatch: (action: DeckAction) => void,
	getState: () => AppState
) => {
	dispatch(editDeckStarted());
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;
		const res = await fetch(`${env.serverUrl}/profile/${user!.id}/deck/${deckId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token,
			},
			body: JSON.stringify({ name: newName, shared: String(newShared) }),
		});

		if (res.status !== 200 && res.status !== 304) {
			const data = await res.json();
			throw new Error(data.message);
		}

		await delay(400);
		dispatch(editDeckSuccess());
	} catch (err) {
		dispatch(editDeckFailure(err));
	}
};

const editDeckStarted = (): DeckAction => ({
	type: DispatchTypes.EDIT_DECK_STARTED,
	payload: null,
});

const editDeckSuccess = (): DeckAction => ({
	type: DispatchTypes.EDIT_DECK_SUCCESS,
	payload: null,
});

const editDeckFailure = (error: Error): DeckAction => ({
	type: DispatchTypes.EDIT_DECK_FAILURE,
	payload: error,
});

export default editDeck;

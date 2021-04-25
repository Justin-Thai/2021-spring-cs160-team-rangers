import { env } from '../../../config';
import { delay } from '../../../utils';
import { AppState } from '../../store';
import { CardAction, DispatchTypes } from '../types';

const deleteCard = (deckId: string, cardId: string) => async (
	dispatch: (action: CardAction) => void,
	getState: () => AppState
) => {
	dispatch(deleteCardStarted(cardId));
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;
		const res = await fetch(`${env.serverUrl}/profile/${user!.id}/deck/${deckId}/card/${cardId}`, {
			method: 'DELETE',
			headers: {
				token,
			},
		});

		const data = await res.json();

		if (res.status !== 200) {
			throw new Error(data.message);
		}

		await delay(400);

		dispatch(deleteCardSuccess(cardId));
	} catch (err) {
		dispatch(deleteCardFailure(err));
	}
};

const deleteCardStarted = (cardId: string): CardAction => ({
	type: DispatchTypes.DELETE_CARD_STARTED,
	payload: cardId,
});

const deleteCardSuccess = (cardId: string): CardAction => ({
	type: DispatchTypes.DELETE_CARD_SUCCESS,
	payload: cardId,
});

const deleteCardFailure = (error: Error): CardAction => ({
	type: DispatchTypes.DELETE_CARD_FAILURE,
	payload: error,
});

export default deleteCard;

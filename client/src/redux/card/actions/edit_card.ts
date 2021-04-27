import { env } from '../../../config';
import { delay } from '../../../utils';
import { AppState } from '../../store';
import { CardAction, DispatchTypes } from '../types';

const editCard = (deckId: string, cardId: string, front: string, back: string, plainBack: string) => async (
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
			body: JSON.stringify({ front_side: front, back_side: back, plain_back_side: plainBack }),
		});

		const data = await res.json();

		if (res.status !== 200) {
			throw new Error(data.message);
		}

		await delay(400);

		dispatch(editCardSuccess());
	} catch (err) {
		dispatch(editCardFailure(err));
	}
};

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

export default editCard;

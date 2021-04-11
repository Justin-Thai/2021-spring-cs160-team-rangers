import { env } from '../../../config';
import { Card } from '../../../models';
import { delay, toReadableTime } from '../../../utils';
import { AppState } from '../../store';
import { CardAction, DispatchTypes } from '../types';

const createCard = (deckId: string, front: string, back: string) => async (
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

export default createCard;

import { env } from '../../../config';
import { Card } from '../../../models';
import { delay, toReadableTime } from '../../../utils';
import { AppState } from '../../store';
import { CardAction, DispatchTypes } from '../types';

const fetchCards = (deckId: string) => async (dispatch: (action: CardAction) => void, getState: () => AppState) => {
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
			plainBackSide: c.plain_back_side,
		}));

		await delay(400);

		dispatch(fetchCardsSuccess(cards));
	} catch (err) {
		dispatch(fetchCardsFailure(err));
	}
};

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

export default fetchCards;

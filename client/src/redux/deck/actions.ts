import { DispatchTypes, DeckAction } from './types';
import { Deck } from '../../models';
import { delay } from '../../utils';

export const fetchDecks = (name = '', page = 1) => async (dispatch: (action: DeckAction) => void) => {
  console.log(name, page)
	dispatch(fetchDecksStarted());
	try {
		const decks: Deck[] = [];
		for (let i = 0; i < 9; i++) {
			decks.push({
				id: `${i}`,
				name: `Deck ${i}`,
				updatedDate: 1617047811,
				cardCount: 12,
			});
		}

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

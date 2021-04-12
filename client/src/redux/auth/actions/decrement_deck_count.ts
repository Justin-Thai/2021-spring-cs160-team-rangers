import { AuthAction, DispatchTypes } from '../types';

const decrementDeckCount = (): AuthAction => ({
	type: DispatchTypes.DECREMENT_DECK_COUNT,
	payload: null,
});

export default decrementDeckCount;

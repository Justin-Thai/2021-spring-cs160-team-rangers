import { AuthAction, DispatchTypes } from '../types';

const incrementDeckCount = (): AuthAction => ({
	type: DispatchTypes.INCREMENT_DECK_COUNT,
	payload: null,
});

export default incrementDeckCount;

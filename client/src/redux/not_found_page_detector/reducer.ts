import { NotFoundPageDetectorAction, NotFoundPageDetectorState, DispatchTypes } from './types';

const initialState: NotFoundPageDetectorState = {
	didNavigateTo404: false,
};

export default function notFoundPageDetectorReducer(
	state = initialState,
	action: NotFoundPageDetectorAction
): NotFoundPageDetectorState {
	switch (action.type) {
		case DispatchTypes.SET_NOT_FOUND: {
			const newState = { ...state };
			newState.didNavigateTo404 = true;
			return newState;
		}
		case DispatchTypes.UNSET_NOT_FOUND: {
			const newState = { ...state };
			newState.didNavigateTo404 = false;
			return newState;
		}
		default:
			return state;
	}
}

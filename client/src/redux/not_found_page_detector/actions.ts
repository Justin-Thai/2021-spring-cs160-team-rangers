import { DispatchTypes, NotFoundPageDetectorAction } from './types';

export const setDidNavigateTo404 = (): NotFoundPageDetectorAction => ({
	type: DispatchTypes.SET_NOT_FOUND,
	payload: null,
});

export const unsetDidNavigateTo404 = (): NotFoundPageDetectorAction => ({
	type: DispatchTypes.UNSET_NOT_FOUND,
	payload: null,
});
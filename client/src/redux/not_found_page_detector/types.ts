export enum DispatchTypes {
	SET_NOT_FOUND = 'SET_NOT_FOUND',
	UNSET_NOT_FOUND = 'UNSET_NOT_FOUND',
}

export type NotFoundPageDetectorAction = {
	type: string;
	payload: null;
};

export type NotFoundPageDetectorState = {
	didNavigateTo404: boolean;
};

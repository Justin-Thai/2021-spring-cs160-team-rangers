import { User } from '../../models/';

export enum DispatchTypes {
	SIGN_IN_STARTED = 'SIGN_IN_STARTED',
	SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
	SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',

	SIGN_UP_STARTED = 'SIGN_UP_STARTED',
	SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
	SIGN_UP_FAILURE = 'SIGN_UP_FAILURE',

    CHECKAUTH_STARTED = 'CHECKAUTH_STARTED',
    CHECKAUTH_SUCCESS = 'CHECKAUTH_SUCCESS',
    CHECKAUTH_FAILURE = 'CHECKAUTH_FAILURE',

	SIGN_OUT = 'SIGN_OUT',
    CLEAR_ERROR = 'CLEAR_ERROR'
}

export type AuthAction = {
	type: string;
	payload: User | Error | null;
};

export type AuthState = {
	user: User | null;
	loadings: {
        checkAuthLoading: boolean;
		signInLoading: boolean;
		signOutLoading: boolean;
		signUpLoading: boolean;
	};
	errors: {
        checkAuthError: Error | null;
		signInError: Error | null;
		signOutError: Error | null;
		signUpError: Error | null;
	};
};
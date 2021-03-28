import jwt from 'jsonwebtoken';

import { DispatchTypes, AuthAction } from './types';
import { User } from '../../models';
import { delay } from '../../utils';

export const checkAuth = () => async (dispatch: (action: AuthAction) => void) => {
	dispatch(checkAuthStarted());
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			await delay(50);
			return dispatch(checkAuthSuccess(null));
		}

		const res = await fetch('http://localhost:5000/auth', {
			method: 'GET',
			headers: {
				token,
			},
		});

		if (res.status !== 200) {
			return dispatch(checkAuthSuccess(null));
		}

		const decodedData = jwt.decode(token) as {
			[key: string]: any;
		} | null;

		if (!decodedData) {
			throw new Error('Error occured.');
		}

		const user = {
			id: decodedData.id,
			email: decodedData.email,
			name: 'Anh Nguyen',
		};

		dispatch(checkAuthSuccess(user));
	} catch (err) {
		dispatch(checkAuthFailure(err));
	}
};

export const signUp = (email: string, password: string) => async (dispatch: (action: AuthAction) => void) => {
	dispatch(signUpStarted());
	try {
		const res = await fetch('http://localhost:5000/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await res.json();
		if (res.status !== 200) {
			throw new Error(data.message);
		}

		const { token } = data;
		localStorage.setItem('token', token as string);
		const decodedData = jwt.decode(token as string) as {
			[key: string]: any;
		} | null;

		if (!decodedData) {
			throw new Error('Error occured.');
		}

		const user = {
			id: decodedData.id,
			email: decodedData.email,
			name: 'Anh Nguyen',
		};

		dispatch(signUpSuccess(user));
	} catch (err) {
		dispatch(signUpFailure(err));
	}
};

export const logIn = (email: string, password: string) => async (dispatch: (action: AuthAction) => void) => {
	dispatch(signInStarted());
	try {
		const res = await fetch('http://localhost:5000/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();
		if (res.status !== 200) {
			throw new Error(data.message);
		}

		const { token } = data;
		localStorage.setItem('token', token as string);
		const decodedData = jwt.decode(token as string) as {
			[key: string]: any;
		} | null;

		if (!decodedData) {
			throw new Error('Error occured.');
		}

		const user = {
			id: decodedData.id,
			email: decodedData.email,
			name: 'Anh Nguyen',
		};

		dispatch(signInSuccess(user));
	} catch (err) {
		dispatch(signInFailure(err));
	}
};

export const signOut = () => {
	localStorage.removeItem('token');
	return {
		type: DispatchTypes.SIGN_OUT,
		payload: null,
	};
};

export const clearError = () => ({ type: DispatchTypes.CLEAR_ERROR, payload: null });

/* ------------------ action dispatches ------------------ */

const signInStarted = (): AuthAction => ({
	type: DispatchTypes.LOG_IN_STARTED,
	payload: null,
});

const signInSuccess = (user: User): AuthAction => ({
	type: DispatchTypes.LOG_IN_SUCCESS,
	payload: user,
});

const signInFailure = (error: Error): AuthAction => ({
	type: DispatchTypes.LOG_IN_FAILURE,
	payload: error,
});

const signUpStarted = (): AuthAction => ({
	type: DispatchTypes.SIGN_UP_STARTED,
	payload: null,
});

const signUpSuccess = (user: User): AuthAction => ({
	type: DispatchTypes.SIGN_UP_SUCCESS,
	payload: user,
});

const signUpFailure = (error: Error): AuthAction => ({
	type: DispatchTypes.SIGN_UP_FAILURE,
	payload: error,
});

const checkAuthStarted = (): AuthAction => ({
	type: DispatchTypes.CHECKAUTH_STARTED,
	payload: null,
});

const checkAuthSuccess = (user: User | null): AuthAction => ({
	type: DispatchTypes.CHECKAUTH_SUCCESS,
	payload: user,
});

const checkAuthFailure = (error: Error): AuthAction => ({
	type: DispatchTypes.CHECKAUTH_FAILURE,
	payload: error,
});

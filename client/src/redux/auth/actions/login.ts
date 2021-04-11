import { env } from '../../../config';
import { User } from '../../../models';
import { decodeJWT, fetchSelf } from '../../../utils';
import { AuthAction, DispatchTypes } from '../types';

const logIn = (email: string, password: string) => async (dispatch: (action: AuthAction) => void) => {
	dispatch(signInStarted());
	try {
		const res = await fetch(`${env.serverUrl}/signin`, {
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
		const decodedData = decodeJWT(token);

		if (!decodedData) {
			throw new Error('Error occured');
		}

		const user = await fetchSelf(token, decodedData.id);

		dispatch(signInSuccess(user));
	} catch (err) {
		dispatch(signInFailure(err));
	}
};

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

export default logIn;

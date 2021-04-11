import { env } from '../../../config';
import { User } from '../../../models';
import { decodeJWT, delay, fetchSelf } from '../../../utils';
import { AuthAction, DispatchTypes } from '../types';

const checkAuth = () => async (dispatch: (action: AuthAction) => void) => {
	dispatch(checkAuthStarted());
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			await delay(50);
			return dispatch(checkAuthSuccess(null));
		}

		const res = await fetch(`${env.serverUrl}/auth`, {
			method: 'GET',
			headers: {
				token,
			},
		});

		if (res.status !== 200) {
			return dispatch(checkAuthSuccess(null));
		}

		const decodedData = decodeJWT(token);

		if (!decodedData) {
			throw new Error('Error occured');
		}

		const user = await fetchSelf(token, decodedData.id);

		dispatch(checkAuthSuccess(user));
	} catch (err) {
		dispatch(checkAuthFailure(err));
	}
};

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

export default checkAuth;

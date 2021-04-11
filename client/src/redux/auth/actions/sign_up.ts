import { env } from '../../../config';
import { User } from '../../../models';
import { decodeJWT, fetchSelf } from '../../../utils';
import { AuthAction, DispatchTypes } from '../types';

const signUp = (name: string, email: string, password: string, retypePassword: string) => async (
	dispatch: (action: AuthAction) => void
) => {
	dispatch(signUpStarted());
	try {
		if (!name.length) {
			throw new Error('Name is not valid');
		}

		if (password.length < 9) {
			throw new Error('Password must be at least 9 characters long');
		}

		if (password !== retypePassword) {
			throw new Error('Passwords do not match');
		}

		const res = await fetch(`${env.serverUrl}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, name, password }),
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

		dispatch(signUpSuccess(user));
	} catch (err) {
		dispatch(signUpFailure(err));
	}
};

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

export default signUp;

import { env } from '../../../config';
import { User } from '../../../models';
import { delay } from '../../../utils';
import { AppState } from '../../store';
import { AuthAction, DispatchTypes } from '../types';

const editProfile = (name: string, email: string) => async (
	dispatch: (action: AuthAction) => void,
	getState: () => AppState
) => {
	const token = localStorage.getItem('token');

	const { user } = getState().auth;
	if (!token || !user) {
		await delay(50);
		return;
	}
	if (!name && !email) {
		return;
	}

	if (name === user.name && email === user.email) {
		return;
	}

	dispatch(editProfileStarted());
	try {
		let body = '';
		if (name !== user.name && email !== user.email) {
			body = JSON.stringify({ name, email });
		} else if (name !== user.name && email === user.email) {
			body = JSON.stringify({ name });
		} else {
			body = JSON.stringify({ email });
		}

		const res = await fetch(`${env.serverUrl}/profile/${user.id}/edit`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token,
			},
			body,
		});

		const data = await res.json();
		if (res.status !== 200) {
			throw new Error(data.message);
		}

		const newUser = {
			id: data.user.id,
			email: data.user.email,
			name: data.user.name,
			deckCount: data.user.deck_count,
			reportCount: data.user.report_count,
		};

		await delay(500);
		dispatch(editProfileSuccess(newUser));
	} catch (err) {
		dispatch(editProfileFailure(err));
	}
};

const editProfileStarted = (): AuthAction => ({
	type: DispatchTypes.EDIT_PROFILE_STARTED,
	payload: null,
});

const editProfileSuccess = (user: User): AuthAction => ({
	type: DispatchTypes.EDIT_PROFILE_SUCCESS,
	payload: user,
});

const editProfileFailure = (error: Error): AuthAction => ({
	type: DispatchTypes.EDIT_PROFILE_FAILURE,
	payload: error,
});

export default editProfile;

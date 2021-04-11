import { DispatchTypes } from '../types';

const signOut = () => {
	localStorage.removeItem('token');
	return {
		type: DispatchTypes.SIGN_OUT,
		payload: null,
	};
};

export default signOut;

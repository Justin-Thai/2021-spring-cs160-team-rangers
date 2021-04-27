import { AuthAction, AuthState, DispatchTypes } from './types';
import { User } from '../../models';

const initialState: AuthState = {
	user: null,
	loadings: {
		checkAuthLoading: false,
		signInLoading: false,
		signOutLoading: false,
		signUpLoading: false,
		editProfileLoading: false,
	},
	errors: {
		checkAuthError: null,
		signInError: null,
		signOutError: null,
		signUpError: null,
		editProfileError: null,
	},
};

export default function authReducer(state = initialState, action: AuthAction): AuthState {
	switch (action.type) {
		case DispatchTypes.CHECKAUTH_STARTED: {
			const newState = { ...state };
			newState.loadings.checkAuthLoading = true;
			newState.errors.checkAuthError = null;
			return newState;
		}
		case DispatchTypes.CHECKAUTH_SUCCESS: {
			const newState = { ...state };
			newState.loadings.checkAuthLoading = false;
			newState.errors.checkAuthError = null;
			newState.user = action.payload as User;
			return newState;
		}
		case DispatchTypes.CHECKAUTH_FAILURE: {
			const newState = { ...state };
			newState.loadings.checkAuthLoading = false;
			newState.errors.checkAuthError = action.payload as Error;
			return newState;
		}
		case DispatchTypes.SIGN_UP_STARTED: {
			const newState = { ...state };
			newState.loadings.signUpLoading = true;
			newState.errors.signUpError = null;
			return newState;
		}
		case DispatchTypes.SIGN_UP_SUCCESS: {
			const newState = { ...state };
			newState.loadings.signUpLoading = false;
			newState.errors.signUpError = null;
			newState.user = action.payload as User;
			return newState;
		}
		case DispatchTypes.SIGN_UP_FAILURE: {
			const newState = { ...state };
			newState.loadings.signUpLoading = false;
			newState.errors.signUpError = action.payload as Error;
			return newState;
		}
		case DispatchTypes.LOG_IN_STARTED: {
			const newState = { ...state };
			newState.loadings.signInLoading = true;
			newState.errors.signInError = null;
			return newState;
		}
		case DispatchTypes.LOG_IN_SUCCESS: {
			const newState = { ...state };
			newState.loadings.signInLoading = false;
			newState.errors.signInError = null;
			newState.user = action.payload as User;
			return newState;
		}
		case DispatchTypes.LOG_IN_FAILURE: {
			const newState = { ...state };
			newState.loadings.signInLoading = false;
			newState.errors.signInError = action.payload as Error;
			return newState;
		}
		case DispatchTypes.SIGN_OUT: {
			const newState = { ...state };
			newState.user = null;
			return newState;
		}
		case DispatchTypes.CLEAR_ERROR: {
			const newState = { ...state };
			newState.errors.signInError = null;
			newState.errors.signUpError = null;
			newState.errors.signOutError = null;
			return newState;
		}
		case DispatchTypes.INCREMENT_DECK_COUNT: {
			const newState = { ...state };
			newState.user!.deckCount += 1;
			return newState;
		}
		case DispatchTypes.INCREMENT_REPORT_COUNT: {
			const newState = { ...state };
			newState.user!.reportCount += 1;
			return newState;
		}
		case DispatchTypes.DECREMENT_DECK_COUNT: {
			const newState = { ...state };
			newState.user!.deckCount -= 1;
			return newState;
		}
		case DispatchTypes.EDIT_PROFILE_STARTED: {
			const newState = { ...state };
			newState.loadings.editProfileLoading = true;
			newState.errors.editProfileError = null;
			return newState;
		}
		case DispatchTypes.EDIT_PROFILE_SUCCESS: {
			const newState = { ...state };
			newState.user = action.payload as User;
			newState.loadings.editProfileLoading = false;
			return newState;
		}
		case DispatchTypes.EDIT_PROFILE_FAILURE: {
			const newState = { ...state };
			newState.loadings.editProfileLoading = false;
			newState.errors.editProfileError = action.payload as Error;
			return newState;
		}
		default:
			return state;
	}
}

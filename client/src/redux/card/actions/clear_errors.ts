import { DispatchTypes } from '../types';

const clearErrors = () => ({
	type: DispatchTypes.CLEAR_ERRORS,
	payload: null,
});

export default clearErrors;

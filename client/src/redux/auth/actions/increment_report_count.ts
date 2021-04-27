import { AuthAction, DispatchTypes } from '../types';

const incrementReportCount = (): AuthAction => ({
	type: DispatchTypes.INCREMENT_REPORT_COUNT,
	payload: null,
});

export default incrementReportCount;

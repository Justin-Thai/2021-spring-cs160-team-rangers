import { env } from '../../../config';
import { Deck, StudyReport } from '../../../models';
import { delay, toReadableTime } from '../../../utils';
import { incrementDeckCount } from '../../auth/actions';
import { AuthAction } from '../../auth/types';
import { AppState } from '../../store';
import { DispatchTypes, StudyReportAction } from '../types';

const createStudyReport = (name: string, shared = false) => async (
	dispatch: (action: StudyReportAction) => void,
	getState: () => AppState
) => {
	dispatch(createStudyReportStarted());
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;

		await delay(400);

		// dispatch(createStudyReportSuccess(newDeck));
	} catch (err) {
		dispatch(createStudyReportFailure(err));
	}
};

const createStudyReportStarted = (): StudyReportAction => ({
	type: DispatchTypes.CREATE_STUDY_REPORT_STARTED,
	payload: null,
});

const createStudyReportSuccess = (studyReport: StudyReport): StudyReportAction => ({
	type: DispatchTypes.CREATE_STUDY_REPORT_SUCCESS,
	payload: studyReport,
});

const createStudyReportFailure = (error: Error): StudyReportAction => ({
	type: DispatchTypes.CREATE_STUDY_REPORT_FAILURE,
	payload: error,
});

export default createStudyReport;

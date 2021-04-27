import { History } from 'history';

import { env } from '../../../config';
import { StudyReport } from '../../../models';
import { delay } from '../../../utils';
import { incrementReportCount } from '../../auth/actions';
import { AuthAction } from '../../auth/types';
import { AppState } from '../../store';
import { DispatchTypes, StudyReportAction } from '../types';

const createStudyReport = (deckId: string, history: History<unknown>, url: string, reportCount: number) => async (
	dispatch: (action: StudyReportAction | AuthAction) => void,
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

		const res = await fetch(`${env.serverUrl}/profile/${user!.id}/deck/${deckId}/study`, {
			method: 'POST',
			headers: {
				token,
			},
		});

		const data = await res.json();
		if (res.status !== 201) {
			throw new Error(data.message);
		}

		const newStudyReport = {
			id: String(data.studyReport.id),
			name: data.studyReport.name,
			correctCount: data.studyReport.correct_count,
			incorrectCount: data.studyReport.incorrect_count,
			createdAt: data.studyReport.created_at,
			endAt: data.studyReport.end_at,
		};

		history.push({
			pathname: `${url}/${newStudyReport.id}/studying/${data.cardIds[0]}`,
			state: { cardIds: data.cardIds, deckId, reportCount: reportCount + 1 },
		});

		dispatch(incrementReportCount());
		dispatch(createStudyReportSuccess(newStudyReport));
	} catch (err) {
		console.log(err);
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

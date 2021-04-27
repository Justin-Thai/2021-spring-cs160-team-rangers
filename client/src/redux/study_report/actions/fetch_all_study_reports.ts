import { env } from '../../../config';
import { StudyReport } from '../../../models';
import { delay } from '../../../utils';
import { AppState } from '../../store';
import { StudyReportAction, DispatchTypes } from '../types';

const fetchAllStudyReports = (page = 1) => async (
	dispatch: (action: StudyReportAction) => void,
	getState: () => AppState
) => {
	dispatch(fetchAllStudyReportsStarted());
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;
		const res = await fetch(
			`${env.serverUrl}/profile/${user!.id}/study?page=${page}`,
			{
				method: 'GET',
				headers: {
					token,
				},
			}
		);

		const data = await res.json();
		if (res.status !== 200) {
			throw new Error(data.message);
		}

		const studyReports = data.studyReports.map((report: any) => ({
			id: String(report.id),
			name: report.name,
			correctCount: report.correct_count,
			incorrectCount: report.incorrect_count,
			createdAt: report.created_at,
			endAt: report.end_time,
		}));

		await delay(400);

		dispatch(fetchAllStudyReportsSuccess(studyReports));
	} catch (err) {
		dispatch(fetchAllStudyReportsFailure(err));
	}
};

const fetchAllStudyReportsStarted = (): StudyReportAction => ({
	type: DispatchTypes.FETCH_ALL_STUDY_REPORTS_STARTED,
	payload: null,
});

const fetchAllStudyReportsSuccess = (decks: StudyReport[]): StudyReportAction => ({
	type: DispatchTypes.FETCH_ALL_STUDY_REPORTS_SUCCESS,
	payload: decks,
});

const fetchAllStudyReportsFailure = (error: Error): StudyReportAction => ({
	type: DispatchTypes.FETCH_ALL_STUDY_REPORTS_FAILURE,
	payload: error,
});

export default fetchAllStudyReports;

import { env } from '../../../config';
import { StudyReport } from '../../../models';
import { delay } from '../../../utils';
import { AppState } from '../../store';
import { StudyReportAction, DispatchTypes } from '../types';

const fetchStudyReports = (deckId: string, page = 1) => async (
	dispatch: (action: StudyReportAction) => void,
	getState: () => AppState
) => {
	dispatch(fetchStudyReportsStarted());
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			await delay(50);
			return;
		}

		const { user } = getState().auth;
		const res = await fetch(
			`${env.serverUrl}/profile/${user!.id}/deck/${deckId}/study?limit=${env.decksPerPage}&page=${page}`,
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

		dispatch(fetchStudyReportsSuccess(studyReports));
	} catch (err) {
		dispatch(fetchStudyReportsFailure(err));
	}
};

const fetchStudyReportsStarted = (): StudyReportAction => ({
	type: DispatchTypes.FETCH_STUDY_REPORT_STARTED,
	payload: null,
});

const fetchStudyReportsSuccess = (decks: StudyReport[]): StudyReportAction => ({
	type: DispatchTypes.FETCH_STUDY_REPORT_SUCCESS,
	payload: decks,
});

const fetchStudyReportsFailure = (error: Error): StudyReportAction => ({
	type: DispatchTypes.FETCH_STUDY_REPORT_FAILURE,
	payload: error,
});

export default fetchStudyReports;

import { StudyReportAction, StudyReportState, DispatchTypes } from './types';
import { StudyReport } from '../../models';

const initialState: StudyReportState = {
	studyReports: [],
	loadings: {
		fetchStudyReportsLoading: false,
		createStudyReportLoading: false,
		editStudyReportLoading: false,
		deleting: '',
	},
	errors: {
		fetchStudyReportsError: null,
		createStudyReportError: null,
		editStudyReportError: null,
		deleteStudyReportError: null,
	},
};

export default function studyReportReducer(state = initialState, action: StudyReportAction): StudyReportState {
	switch (action.type) {
		case DispatchTypes.FETCH_STUDY_REPORT_STARTED: {
			const newState = { ...state };
			newState.loadings.fetchStudyReportsLoading = true;
			newState.errors.fetchStudyReportsError = null;
			return newState;
		}
		case DispatchTypes.FETCH_STUDY_REPORT_SUCCESS: {
			const newState = { ...state };
			const studyReports = action.payload as StudyReport[];
			newState.loadings.fetchStudyReportsLoading = false;
			newState.studyReports = studyReports;
			return newState;
		}
		case DispatchTypes.FETCH_STUDY_REPORT_FAILURE: {
			const newState = { ...state };
			const error = action.payload as Error;
			newState.loadings.fetchStudyReportsLoading = false;
			newState.errors.fetchStudyReportsError = error;
			return newState;
		}
		default:
			return state;
	}
}

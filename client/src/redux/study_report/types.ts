import { StudyReport } from '../../models/';

export enum DispatchTypes {
	CREATE_STUDY_REPORT_STARTED = 'CREATE_STUDY_REPORT_STARTED',
	CREATE_STUDY_REPORT_SUCCESS = 'CREATE_STUDY_REPORT_SUCCESS',
	CREATE_STUDY_REPORT_FAILURE = 'CREATE_STUDY_REPORT_FAILURE',

	FETCH_STUDY_REPORT_STARTED = 'FETCH_STUDY_REPORT_STARTED',
	FETCH_STUDY_REPORT_SUCCESS = 'FETCH_STUDY_REPORT_SUCCESS',
	FETCH_STUDY_REPORT_FAILURE = 'FETCH_STUDY_REPORT_FAILURE',
}

export type StudyReportAction = {
	type: string;
	payload: any;
};

export type StudyReportState = {
	studyReports: StudyReport[];
	loadings: {
		fetchStudyReportsLoading: boolean;
		createStudyReportLoading: boolean;
		editStudyReportLoading: boolean;
		deleting: string;
	};
	errors: {
		fetchStudyReportsError: Error | null;
		createStudyReportError: Error | null;
		editStudyReportError: Error | null;
		deleteStudyReportError: Error | null;
	};
};

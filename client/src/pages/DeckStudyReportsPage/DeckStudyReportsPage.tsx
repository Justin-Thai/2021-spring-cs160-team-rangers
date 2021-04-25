import React, { Component } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import { AppState } from '../../redux/store';
import styles from './styles.module.scss';
import { PageHeader } from './components';
import { fetchStudyReports, createStudyReport } from '../../redux/study_report/actions';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { useQuery } from '../../hooks';
import { env } from '../../config';
import { Loading, Pagination } from '../../components';
import { StudyReport } from '../../models';
import StudyReportList from './components/StudyReportList/StudyReportList';

interface DeckStudyReportsPageProps {
	deckId: string;
	page: number | null;
	url: string;
	history: History<unknown>;
	reportCount: number;
	studyReports: StudyReport[];
	loading: boolean;

	onFetchStudyReports: (deckId: string, page?: number) => void;
	onCreateStudyReport: (deckId: string, history: History<unknown>, url: string, reportCount: number) => void;
}

interface DeckStudyReportsPageState {
	currentPage: number;
	forcedPage: number;
}

class DeckStudyReportsPage extends Component<DeckStudyReportsPageProps, DeckStudyReportsPageState> {
	state = {
		currentPage: this.props.page ? this.props.page - 1 : 0,
		forcedPage: -1,
	};

	componentDidMount() {
		const { deckId, page, onFetchStudyReports } = this.props;
		onFetchStudyReports(deckId, page ? page : undefined);
	}

	componentDidUpdate(prevProps: DeckStudyReportsPageProps) {
		const { page, deckId, onFetchStudyReports } = this.props;
		if (page === 0 && page !== prevProps.page) {
			this.setState({ forcedPage: 0 }, () => {
				onFetchStudyReports(deckId);
			});
		}
	}

	handlePageClick = ({ selected }: { selected: number }) => {
		const page = selected;
		this.setState({ currentPage: page, forcedPage: -1 }, () => {
			const { history, url, deckId, onFetchStudyReports } = this.props;
			history.push({ pathname: url, search: `?page=${page + 1}`, state: { reportCount: this.props.reportCount } });
			onFetchStudyReports(deckId, page + 1);
		});
	};

	renderPagination = () => {
		const { reportCount, onFetchStudyReports } = this.props;
		// if (fetchError) return null;
		const totalPages = Math.ceil(reportCount / env.decksPerPage);
		if (totalPages < 1 || reportCount <= 9) return null;
		return (
			<div className={styles.paginationContainer}>
				<Pagination
					pageCount={totalPages}
					currentPage={this.state.currentPage}
					forcePage={this.state.forcedPage !== -1 ? this.state.forcedPage : undefined}
					onPageChange={this.handlePageClick}
				/>
			</div>
		);
	};

	renderDeckList = () => {
		const { studyReports, loading } = this.props;
		if (loading) {
			return (
				<div className={styles.loadingWrapper}>
					<Loading />
				</div>
			);
		}
		// if (fetchError) {
		// 	return (
		// 		<div className={styles.errorWrapper}>
		// 			<ErrorView error={fetchError.message} />
		// 		</div>
		// 	);
		// }
		// if (deleteError) {
		// 	return (
		// 		<div className={styles.errorWrapper}>
		// 			<ErrorView error={deleteError.message} />
		// 		</div>
		// 	);
		// }
		// if (!decks.length) {
		// 	return (
		// 		<div className={styles.emptyWrapper}>
		// 			<Empty />
		// 		</div>
		// 	);
		// }
		return <StudyReportList studyReports={studyReports} />;
	};

	createStudyReport = () => {
		const { history, deckId, url, reportCount, onCreateStudyReport } = this.props;
		onCreateStudyReport(deckId, history, url, reportCount);
	};

	render() {
		return (
			<div className={styles.container}>
				<PageHeader createNewStudy={this.createStudyReport} goBack={this.props.history.goBack} />
				{this.renderDeckList()}
				{this.renderPagination()}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	studyReports: state.studyReport.studyReports,
	loading: state.studyReport.loadings.fetchStudyReportsLoading,
});

const mapDispatchToProps = {
	onFetchStudyReports: fetchStudyReports,
	onCreateStudyReport: createStudyReport,
};

const ComponentWithProps = connect(mapStateToProps, mapDispatchToProps)(DeckStudyReportsPage);

function HOCDeckSturyReportPage() {
	const history = useHistory();
	const { deckId } = useParams<{ deckId: string }>();
	const { url } = useRouteMatch();
	const location = useLocation<{ reportCount: number }>();
	const { reportCount } = location.state;
	const query = useQuery();
	const page = Number(query.get('page'));
	return <ComponentWithProps history={history} deckId={deckId} url={url} page={page} reportCount={reportCount} />;
}

export default HOCDeckSturyReportPage;

import React, { Component } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';

import { PageHeader, DeckList } from './components';
import { useQuery } from '../../hooks';
import { Pagination, Loading, Empty } from '../../components';
import { encodeURIsearchParam } from '../../utils';
import { env } from '../../config';
import { Deck } from '../../models';
import { AppState } from '../../redux/store';
import { fetchDecks } from '../../redux/deck/actions';
import styles from './styles.module.scss';

interface DeckPageProps {
	deckCount: number;
	decks: Deck[];
	loading: boolean;
	error: Error | null;
	name: string | null;
	page: number | null;
	url: string;
	history: History<unknown>;
	onFetchDecks: (name?: string, page?: number) => void;
}

interface DeckPageState {
	currentPage: number;
	forcedPage: number;
}

class DeckPage extends Component<DeckPageProps, DeckPageState> {
	state = {
		currentPage: this.props.page ? this.props.page - 1 : 0,
		forcedPage: -1,
	};

	componentDidMount() {
		const { name, page, onFetchDecks } = this.props;
		onFetchDecks(name ? name : undefined, page ? page : undefined);
	}

	componentDidUpdate(prevProps: DeckPageProps) {
		const { name, page, onFetchDecks } = this.props;
		if (page === 0 && ((page !== prevProps.page && name === null) || (name !== prevProps.name && name === null))) {
			this.setState({ forcedPage: 0 }, () => {
				onFetchDecks();
			});
		}
	}

	handlePageClick = ({ selected }: { selected: number }) => {
		const page = selected;
		this.setState({ currentPage: page, forcedPage: -1 }, () => {
			const { name, history, url, onFetchDecks } = this.props;
			if (name) {
				history.push(`${url}?name=${name}&page=${page + 1}`);
			} else {
				history.push(`${url}?page=${page + 1}`);
			}
			onFetchDecks(name ? name : undefined, page + 1);
		});
	};

	goToDeck = (deckId: string) => {
		const { url, history } = this.props;
		history.push(`${url}/${deckId}`);
	};

	renderPagination = () => {
		const totalPages = Math.ceil(this.props.deckCount / env.decksPerPage);
		if (totalPages < 1) return null;
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

	performSearch = (search: string) => {
		const convertedSearchParam = encodeURIsearchParam(search);
		const { history, onFetchDecks, url } = this.props;
		this.setState({ currentPage: 0, forcedPage: 0 }, () => {
			history.push(`${url}?name=${convertedSearchParam}`);
			onFetchDecks(convertedSearchParam);
		});
	};

	render() {
		const { decks, loading, name } = this.props;
		return (
			<div className={styles.container}>
				<PageHeader performSearch={this.performSearch} searchFromURI={name} />
				{loading ? (
					<div className={styles.loadingWrapper}>
						<Loading />
					</div>
				) : decks.length ? (
					<DeckList decks={decks} goToDeck={this.goToDeck} />
				) : (
					<div className={styles.emptyWrapper}>
						<Empty />
					</div>
				)}

				{this.renderPagination()}
			</div>
		);
	}
}

interface DeckPageHOCProps {
	decks: Deck[];
	deckCount: number;
	loading: boolean;
	error: Error | null;
	onFetchDecks: (name?: string, page?: number) => void;
}

function DeckPageHOC(props: DeckPageHOCProps) {
	const history = useHistory();
	const { url } = useRouteMatch();
	const query = useQuery();
	const name = query.get('name');
	const page = Number(query.get('page'));
	return <DeckPage {...props} history={history} url={url} name={name} page={page} />;
}

const mapStateToProps = (state: AppState) => ({
	decks: state.deck.decks,
	deckCount: state.auth.user?.deckCount ?? 0,
	loading: state.deck.loading,
	error: state.deck.error,
});

const mapDispatchToProps = {
	onFetchDecks: fetchDecks,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckPageHOC);

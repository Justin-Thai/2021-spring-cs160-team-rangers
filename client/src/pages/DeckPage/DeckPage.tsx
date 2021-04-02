import React, { Component } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';

import { PageHeader, DeckList } from './components';
import { useQuery } from '../../hooks';
import { Pagination, Loading, Empty, ErrorView } from '../../components';
import { encodeURIsearchParam } from '../../utils';
import { env } from '../../config';
import { Deck } from '../../models';
import { AppState } from '../../redux/store';
import { fetchDecks, deleteDeck } from '../../redux/deck/actions';
import styles from './styles.module.scss';

interface DeckPageProps {
	deckCount: number;
	decks: Deck[];
	loading: boolean;
	fetchError: Error | null;
	deleteError: Error | null;
	name: string | null;
	page: number | null;
	url: string;
	history: History<unknown>;
	onFetchDecks: (name?: string, page?: number) => void;
	onDeleteDeck: (deckId: string) => void;
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
		const { name, page, decks, onFetchDecks } = this.props;
		if (page === 0 && ((page !== prevProps.page && name === null) || (name !== prevProps.name && name === null))) {
			this.setState({ forcedPage: 0 }, () => {
				onFetchDecks();
			});
		}
		// if (decks.length < prevProps.decks.length) {
		// 	onFetchDecks();
		// }
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

	goToDeckCreation = () => {
		const { url, history } = this.props;
		history.push(`${url}/create`);
	};

	renderPagination = () => {
		const { deckCount, fetchError } = this.props;
		if (fetchError) return null;
		const totalPages = Math.ceil(deckCount / env.decksPerPage);
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

	editDeck = (deckId: string, deckName: string, deckShared: boolean) => {
		const { history, url } = this.props;
		history.push({
			pathname: `${url}/${deckId}/edit`,
			state: { deckName, deckShared },
		});
	};

	deleteDeck = (deckId: string) => {
		const res = window.confirm('Are you sure to delete this deck?');
		if (res) {
			this.props.onDeleteDeck(deckId);
		}
	};

	renderDeckList = () => {
		const { decks, loading, fetchError, deleteError } = this.props;
		if (loading) {
			return (
				<div className={styles.loadingWrapper}>
					<Loading />
				</div>
			);
		}
		if (fetchError) {
			return (
				<div className={styles.errorWrapper}>
					<ErrorView error={fetchError.message} />
				</div>
			);
		}
		if (deleteError) {
			return (
				<div className={styles.errorWrapper}>
					<ErrorView error={deleteError.message} />
				</div>
			);
		}
		if (!decks.length) {
			return (
				<div className={styles.emptyWrapper}>
					<Empty />
				</div>
			);
		}
		return <DeckList decks={decks} goToDeck={this.goToDeck} editDeck={this.editDeck} deleteDeck={this.deleteDeck} />;
	};

	render() {
		return (
			<div className={styles.container}>
				<PageHeader
					performSearch={this.performSearch}
					searchFromURI={this.props.name}
					goToDeckCreation={this.goToDeckCreation}
				/>
				{this.renderDeckList()}
				{this.renderPagination()}
			</div>
		);
	}
}

interface DeckPageHOCProps {
	decks: Deck[];
	deckCount: number;
	loading: boolean;
	fetchError: Error | null;
	deleteError: Error | null;
	onFetchDecks: (name?: string, page?: number) => void;
	onDeleteDeck: (deckId: string) => void;
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
	loading: state.deck.loadings.fetchDecksLoading,
	fetchError: state.deck.errors.fetchDecksError,
	deleteError: state.deck.errors.deleteDeckError,
});

const mapDispatchToProps = {
	onFetchDecks: fetchDecks,
	onDeleteDeck: deleteDeck,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckPageHOC);

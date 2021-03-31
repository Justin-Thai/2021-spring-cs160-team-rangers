import React, { Component } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';

import { PageHeader, DeckList } from './components';
import { useQuery } from '../../hooks';
import { Pagination } from '../../components';
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

	componentDidUpdate(prevProps: DeckPageProps, prevState: DeckPageState) {
		// console.log('current', this.props.page);
		// console.log('prev', prevProps.page);
		if (this.props.page === 0 && this.props.page !== prevProps.page) {
			console.log('back to 0');
			this.setState({ forcedPage: 0 }, () => {
				// this.props.history.push(this.props.url);
				// this.handlePageClick({ selected: 0 });
				this.props.onFetchDecks();
			});
		}
	}

	handlePageClick = ({ selected }: { selected: number }) => {
		const page = selected + 1;
		this.setState({ currentPage: page, forcedPage: -1 }, () => {
			// console.log('changed', this.state.currentPage);
			const { name, history, url, onFetchDecks } = this.props;
			if (name) {
				history.push(`${url}?name=${name}&page=${page}`);
			} else {
				history.push(`${url}?page=${page}`);
			}
			onFetchDecks(name ? name : undefined, page);
		});
	};

	goToDeck = (deckId: string) => {
		const { url, history } = this.props;
		history.push(`${url}/${deckId}`);
	};

	renderPagination = () => {
		// console.log('state cur', this.state.currentPage);
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
		history.push(`${url}?name=${convertedSearchParam}`);
		onFetchDecks(convertedSearchParam);
	};

	render() {
		const { decks, loading } = this.props;
		return (
			<div className={styles.container}>
				<PageHeader performSearch={this.performSearch} />
				{loading ? <div>loading</div> : <DeckList decks={decks} goToDeck={this.goToDeck} />}
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

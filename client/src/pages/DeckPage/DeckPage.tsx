import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';

import { PageHeader, DeckComponent, DeckList } from './components';
import { Pagination } from '../../components';
import { Deck } from '../../models';
import { AppState } from '../../redux/store';
import { fetchDecks } from '../../redux/deck/actions';
import styles from './styles.module.scss';

interface DeckPageProps {
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
}

class DeckPage extends Component<DeckPageProps, DeckPageState> {
	state = {
		currentPage: this.props.page ? this.props.page - 1 : 0,
	};

	componentDidMount() {
		const { name, page, onFetchDecks } = this.props;
		onFetchDecks(name ? name : undefined, page ? page : undefined);
	}

	handlePageClick = ({ selected }: { selected: number }) => {
		console.log('on page change');
		const page = selected + 1;
		this.setState({ currentPage: page }, () => {
			const { name, history, onFetchDecks } = this.props;
			history.push(`${this.props.url}?page=${page}`);
			onFetchDecks(name ? name : undefined, page);
		});
	};

	render() {
		const { decks, loading } = this.props;
		return (
			<div className={styles.container}>
				<PageHeader />
				{loading ? <div>loading</div> : <DeckList decks={decks} />}
				<div className={styles.paginationContainer}>
					<Pagination pageCount={30} currentPage={this.state.currentPage} onPageChange={this.handlePageClick} />
				</div>
			</div>
		);
	}
}

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

interface DeckPageHOCProps {
	decks: Deck[];
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
	loading: state.deck.loading,
	error: state.deck.error,
});

const mapDispatchToProps = {
	onFetchDecks: fetchDecks,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckPageHOC);

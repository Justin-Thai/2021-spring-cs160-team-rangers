import React, { Component } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';

import { PageHeader, CardList } from './components';
import { fetchCards } from '../../redux/card/actions';
import { Card } from '../../models';
import styles from './styles.module.scss';
import { Loading, Empty, ErrorView } from '../../components';
import { AppState } from '../../redux/store';

interface CardPageProps {
	cards: Card[];
	loading: boolean;
	error: Error | null;
	history: History<unknown>;
	url: string;
	deckId: string;
	onFetchCards: (deckId: string) => void;
}

class CardPage extends Component<CardPageProps> {
	componentDidMount() {
		const { deckId, onFetchCards } = this.props;
		onFetchCards(deckId);
	}

	goBack = () => this.props.history.goBack();

	goToCardCreation = () => {
		const { url, history } = this.props;
		history.push(`${url}/card/create`);
	};

	goToCardEdit = (cardId: string, frontSide: string, backSide: string) => {
		const { url, history } = this.props;
		history.push({
			pathname: `${url}/card/${cardId}/edit`,
			state: {
				frontSide,
				backSide,
			},
		});
	};

	renderCardList = () => {
		const { cards, loading, error } = this.props;

		if (loading) {
			return (
				<div className={styles.wrapper}>
					<Loading />
				</div>
			);
		}

		if (error) {
			return (
				<div className={styles.wrapper}>
					<ErrorView error={error.message} />
				</div>
			);
		}

		if (!cards.length) {
			return (
				<div className={styles.wrapper}>
					<Empty />
				</div>
			);
		}

		return <CardList cards={cards} goToCardEdit={this.goToCardEdit} />;
	};

	render() {
		return (
			<div className={styles.container}>
				<PageHeader goBack={this.goBack} goToCardCreation={this.goToCardCreation} />
				{this.renderCardList()}
			</div>
		);
	}
}

interface CardPageHOCProps {
	cards: Card[];
	loading: boolean;
	error: Error | null;
	onFetchCards: (deckId: string) => void;
}

function CardPageHOC(props: CardPageHOCProps) {
	const history = useHistory();
	const { url } = useRouteMatch();
	const { deckId } = useParams<{ deckId: string }>();
	return <CardPage {...props} history={history} url={url} deckId={deckId} />;
}

const mapStateToProps = (state: AppState) => ({
	cards: state.card.cards,
	loading: state.card.loadings.fetchCardsLoading,
	error: state.card.errors.fetchCardsError,
});

const mapDispatchToProps = {
	onFetchCards: fetchCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPageHOC);

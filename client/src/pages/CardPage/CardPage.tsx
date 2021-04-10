import React, { Component } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';

import { PageHeader, CardList } from './components';
import { fetchCards, deleteCard } from '../../redux/card/actions';
import { Card } from '../../models';
import styles from './styles.module.scss';
import { Loading, Empty, ErrorView } from '../../components';
import { AppState } from '../../redux/store';

interface CardPageProps {
	cards: Card[];
	loading: boolean;
	fetchError: Error | null;
	deleteError: Error | null;
	history: History<unknown>;
	url: string;
	deckId: string;
	onFetchCards: (deckId: string) => void;
	onDeleteCard: (deckId: string, cardId: string) => void;
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

	deleteCard = (cardId: string) => {
		const res = window.confirm('Are you sure to delete this card?');
		if (res) {
			const { deckId, onDeleteCard } = this.props;
			onDeleteCard(deckId, cardId);
		}
	};

	renderCardList = () => {
		const { cards, loading, fetchError, deleteError } = this.props;

		if (loading) {
			return (
				<div className={styles.wrapper}>
					<Loading />
				</div>
			);
		}

		if (fetchError) {
			return (
				<div className={styles.wrapper}>
					<ErrorView error={fetchError.message} />
				</div>
			);
		}

		if (deleteError) {
			return (
				<div className={styles.wrapper}>
					<ErrorView error={deleteError.message} />
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

		return <CardList cards={cards} goToCardEdit={this.goToCardEdit} deleteCard={this.deleteCard} />;
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
	fetchError: Error | null;
	deleteError: Error | null;
	onFetchCards: (deckId: string) => void;
	onDeleteCard: (deckId: string, cardId: string) => void;
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
	fetchError: state.card.errors.fetchCardsError,
	deleteError: state.card.errors.deleteCardError,
});

const mapDispatchToProps = {
	onFetchCards: fetchCards,
	onDeleteCard: deleteCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPageHOC);

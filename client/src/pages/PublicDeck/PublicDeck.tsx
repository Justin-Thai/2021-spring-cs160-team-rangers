import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { env } from '../../config';
import { CardList } from './components';
import styles from './styles.module.scss';

interface PublicDeckProps {
	deckId: string;
}

interface PublicDeckState {
	fetched: boolean;
	deck: any;
}

class PublicDeck extends Component<PublicDeckProps, PublicDeckState> {
	state: PublicDeckState = {
		fetched: false,
		deck: null,
	};

	async componentDidMount() {
		const res = await fetch(`${env.serverUrl}/profile/undefined/public/deck/${this.props.deckId}`, {
			method: 'GET',
		});
		if (res.status === 200) {
			const data = await res.json();
			const cards = data.deck.cards.map((c: any) => ({
				id: c.id,
				frontSide: c.front_side,
				backSide: c.back_side,
				plainBackSide: c.plain_back_side,
				createdDate: c.created_at,
			}));
			this.setState({ deck: { ...data.deck, cards }, fetched: true });
		} else {
			this.setState({ fetched: true });
		}
	}

	render() {
		const { deck, fetched } = this.state;
		if (!fetched) return null;
		if (deck === null) {
			return (
				<div className={styles.unauth}>
					<h1 className={styles.text}>You don't have permission to view this deck</h1>
				</div>
			);
		}
		return (
			<div className={styles.container}>
				<h1 className={styles.title}>{deck.name}</h1>
				<CardList cards={deck.cards} />
			</div>
		);
	}
}

function HOCPublicDeck() {
	const { deckId } = useParams<{ deckId: string }>();
	return <PublicDeck deckId={deckId} />;
}

export default HOCPublicDeck;

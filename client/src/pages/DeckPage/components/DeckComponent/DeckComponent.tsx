import React from 'react';

import { Deck } from '../../../../models';
import styles from './styles.module.scss';

interface DeckComponentProps {
	deck: Deck;
	goToDeck: (deckId: string) => void;
}

export default function DeckComponent({ deck, goToDeck }: DeckComponentProps) {
	const performGoToDeck = () => goToDeck(deck.id);

	return (
		<div className={styles.container} onClick={performGoToDeck}>
			<i className={`fas fa-edit ${styles.editIcon}`}></i>
			<div className={styles.wrapper}>
				<div>
					<h1 className={styles.name}>{deck.name}</h1>
					<h3 className={styles.count}>{deck.cardCount} cards</h3>
				</div>
				<h3 className={styles.edit}>Edit 1 hr ago</h3>
			</div>
		</div>
	);
}

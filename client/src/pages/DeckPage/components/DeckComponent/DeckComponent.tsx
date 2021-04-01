import React from 'react';

import { Deck } from '../../../../models';
import { shortenText } from '../../../../utils';
import styles from './styles.module.scss';

interface DeckComponentProps {
	deck: Deck;
	goToDeck: (deckId: string) => void;
	editDeck: (deckId: string, deckName: string, deckShared: boolean) => void;
}

export default function DeckComponent({ deck, goToDeck, editDeck }: DeckComponentProps) {
	const performGoToDeck = () => goToDeck(deck.id);

	const performEditDeck = () => editDeck(deck.id, deck.name, deck.shared);

	return (
		<div className={styles.container}>
			<i className={`fas fa-edit ${styles.editIcon}`} onClick={performEditDeck} style={{ cursor: 'pointer' }}></i>
			<div className={styles.wrapper}>
				<div>
					<h1 className={styles.name} onClick={performGoToDeck}>
						{shortenText(deck.name)}
					</h1>
					<h3 className={styles.count}>{deck.cardCount} cards</h3>
				</div>
				<div className={styles.right}>
					<h3 className={styles.edit}>
						Edit {deck.updatedDate} {deck.updatedDate.includes('just now') ? '' : 'ago'}
					</h3>
					<h5 className={styles.shared}>{deck.shared ? 'Shared with link' : 'Private'}</h5>
				</div>
			</div>
		</div>
	);
}

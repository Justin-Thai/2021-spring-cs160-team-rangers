import React from 'react';

import { Deck } from '../../../../models';
import DeckComponent from '../DeckComponent/DeckComponent';
import styles from './styles.module.scss';

interface DeckListProps {
	decks: Deck[];
	goToDeck: (deckId: string) => void;
	deleteDeck: (deckId: string) => void;
	editDeck: (deckId: string, deckName: string, deckShared: boolean) => void;
}

export default function DeckList({ decks, goToDeck, editDeck, deleteDeck }: DeckListProps) {
	return (
		<div className={styles.container}>
			{decks.map((d) => (
				<DeckComponent key={d.id} deck={d} goToDeck={goToDeck} deleteDeck={deleteDeck} editDeck={editDeck} />
			))}
		</div>
	);
}

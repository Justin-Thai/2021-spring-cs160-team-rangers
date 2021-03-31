import React from 'react';

import { Deck } from '../../../../models';
import DeckComponent from '../DeckComponent/DeckComponent';
import styles from './styles.module.scss';

interface DeckListProps {
  decks: Deck[];
  goToDeck: (deckId: string) => void;
}

export default function DeckList({ decks, goToDeck }: DeckListProps) {
	return (
		<div className={styles.container}>
			{decks.map((d) => (
				<DeckComponent key={d.id} deck={d} goToDeck={goToDeck} />
			))}
		</div>
	);
}

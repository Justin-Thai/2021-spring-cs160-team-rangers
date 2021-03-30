import React from 'react';

import { Deck } from '../../../../models';
import DeckComponent from '../DeckComponent/DeckComponent';
import styles from './styles.module.scss';

export default function DeckList({ decks }: { decks: Deck[] }) {
	return (
		<div className={styles.container}>
			{decks.map((d) => (
				<DeckComponent key={d.id} deck={d} />
			))}
		</div>
	);
}

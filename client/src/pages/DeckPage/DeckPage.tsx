import React from 'react';

import { PageHeader, DeckComponent } from './components';
import { Deck } from '../../models';
import styles from './styles.module.scss';

export default function DeckPage() {
	const decks: Deck[] = [];
	for (let i = 0; i < 9; i++) {
		decks.push({
			id: `${i}`,
			name: `Deck ${i}`,
			updatedDate: 1617047811,
			count: 12,
		});
	}

	const renderDecks = () => {
		return (
			<div className={styles.deckContainer}>
				{decks.map((d) => (
					<DeckComponent key={d.id} deck={d} />
				))}
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<PageHeader />
			{renderDecks()}
		</div>
	);
}

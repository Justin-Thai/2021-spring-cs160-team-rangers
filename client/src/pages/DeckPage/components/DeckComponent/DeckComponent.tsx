import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Deck } from '../../../../models';
import { shortenText } from '../../../../utils';
import styles from './styles.module.scss';

interface DeckComponentProps {
	deck: Deck;
	goToDeck: (deckId: string, deckName: string, reportCount: number) => void;
	deleteDeck: (deckId: string) => void;
	editDeck: (deckId: string, deckName: string, deckShared: boolean) => void;
}

export default function DeckComponent({ deck, goToDeck, editDeck, deleteDeck }: DeckComponentProps) {
	const performGoToDeck = () => goToDeck(deck.id, deck.name, deck.reportCount);

	const performEditDeck = () => editDeck(deck.id, deck.name, deck.shared);

	const performDeleteDeck = () => deleteDeck(deck.id);

	const renderPrivacy = () => {
		if (deck.shared) {
			const link = `${document.domain}/deck/${deck.id}`;
			return (
				<CopyToClipboard text={link} onCopy={() => alert('Shared link copid to clipboard.')}>
					<h5 className={styles.shared} style={{ cursor: 'pointer' }}>
						Shared with link
					</h5>
				</CopyToClipboard>
			);
		}
		return <h5 className={styles.shared}>Private</h5>;
	};

	return (
		<div className={styles.container}>
			<i className={`fas fa-edit ${styles.editIcon}`} style={{ cursor: 'pointer' }} onClick={performEditDeck}></i>
			<i
				className={`fas fa-trash-alt ${styles.deleteIcon}`}
				style={{ cursor: 'pointer' }}
				onClick={performDeleteDeck}
			></i>
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
					{renderPrivacy()}
				</div>
			</div>
		</div>
	);
}

import React from 'react';

import cardsImg from './cards.png';
import buttonImg from './button.png';
import Background from './Background';
import styles from './styles.module.scss';

export default function Header() {
	return (
		<div>
			<div className={styles.header}>
				<Background />
				<div className={styles.items}>
					<div className={styles.titleAndButton}>
						<h1 className={styles.title}>Flashcards for Education</h1>
						<button style={{ background: `url(${buttonImg})` }}>start here</button>
					</div>
					<img src={cardsImg} alt='cards' />
				</div>
			</div>
		</div>
	);
}

import React from 'react';

import cardsImg from './cards.png';
import buttonImg from './button.png';
import Background from './Background';
import { lang } from '../../../../config';
import styles from './styles.module.scss';

export default function Header() {
	const { title, startHereBtn } = lang['en'].header;
	return (
		<div>
			<div className={styles.header}>
				<Background />
				<div className={styles.items}>
					<div className={styles.titleAndButton}>
						<h1 className={styles.title}>{title}</h1>
						<button
							style={{ background: `url(${buttonImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
							className={styles.startHereBtn}
						>
							{startHereBtn}
						</button>
					</div>
					<img src={cardsImg} alt='cards' />
				</div>
			</div>
		</div>
	);
}

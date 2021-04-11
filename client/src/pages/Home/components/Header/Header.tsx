import React from 'react';

import cardsImg from './cards.png';
import buttonImg from './button.png';
import { lang } from '../../../../config';
import background from './background.svg';
import styles from './styles.module.scss';

export default function Header() {
	const { title, startHereBtn } = lang['en'].header;
	return (
		<div>
			<div className={styles.header}>
				<img src={background} alt='' style={{ width: '100%' }} />
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

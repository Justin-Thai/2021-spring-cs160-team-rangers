import React, { useState } from 'react';

import { Card } from '../../../../models';
import styles from './styles.module.scss';

interface CardComponentProps {
	card: Card;
	classList: string;
}

export default function CardComponent({ card, classList }: CardComponentProps) {
	const [showBackSide, setShowBackside] = useState(false);

	const toggleBackSide = () => setShowBackside(!showBackSide);

	return (
		<div
			className={`${styles.container} ${classList} ${showBackSide ? styles.showBackSide : ''} `}
			onClick={toggleBackSide}
		>
			<div className={styles.frontSide}>
				<h1 className={styles.frontText}>{card.frontSide}</h1>
			</div>
			<div className={styles.backSide}>
				<p className={styles.backText}>{card.backSide}</p>
			</div>
		</div>
	);
}

import React, { useState } from 'react';

import { Card } from '../../../../models';
import CardComponent from '../CardComponent/CardComponent';
import styles from './styles.module.scss';

interface CardListProps {
	cards: Card[];
}

export default function CardList({ cards }: CardListProps) {
	const [current, setCurrent] = useState(0);

	const goForward = () => setCurrent(current + 1);

	const goBack = () => setCurrent(current - 1);

	const setClass = (num: number) => {
		const classArr = [''];
		if (num === current) classArr.push(styles.present);
		if (num > current) classArr.push(styles.next);
		if (num < current) classArr.push(styles.previous);
		return classArr.join(' ');
	};

	return (
		<div className={styles.container}>
			<i className={`fas fa-angle-left ${styles.arrow}`} onClick={goBack}></i>
			<div className={styles.cardsWrapper}>
				{cards.map((c, i) => (
					<CardComponent key={c.id} card={c} classList={setClass(i)} />
				))}
			</div>
			<i className={`fas fa-angle-right ${styles.arrow}`} onClick={goForward}></i>
		</div>
	);
}

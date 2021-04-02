import React, { useState } from 'react';
import Select from 'react-select';
import { ValueType, ActionMeta } from 'react-select';

import { Card } from '../../../../models';
import CardComponent from '../CardComponent/CardComponent';
import styles from './styles.module.scss';

interface CardListProps {
	cards: Card[];
}

export default function CardList({ cards }: CardListProps) {
	const [current, setCurrent] = useState(0);

	const goForward = () => {
		if (current + 1 < cards.length) {
			setCurrent(current + 1);
		}
	};

	const goBack = () => {
		if (current - 1 >= 0) {
			setCurrent(current - 1);
		}
	};

	const goTo = (
		value: ValueType<{ value: number; label: string }, false>,
		_: ActionMeta<{ value: number; label: string }>
	) => {
		setCurrent(value!.value);
	};

	const setClass = (num: number) => {
		const classArr = [''];
		if (num === current) classArr.push(styles.present);
		if (num > current) classArr.push(styles.next);
		if (num < current) classArr.push(styles.previous);
		return classArr.join(' ');
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.editAndDelete}>
					<i className={`fas fa-edit`} style={{ cursor: 'pointer', marginRight: 12 }}></i>
					<i className={`fas fa-trash-alt ${styles.deleteIcon}`} style={{ cursor: 'pointer' }}></i>
				</div>
				<div className={styles.inner}>
					<i className={`fas fa-angle-left ${styles.arrow}`} onClick={goBack}></i>
					<div className={styles.cardsWrapper}>
						{cards.map((c, i) => (
							<CardComponent key={c.id} card={c} classList={setClass(i)} />
						))}
					</div>
					<i className={`fas fa-angle-right ${styles.arrow}`} onClick={goForward}></i>
				</div>
			</div>
			<h1 className={styles.pageNum}>
				{current + 1} / {cards.length}
			</h1>
			<div className={styles.goTo}>
				<h3 className={styles.goToLabel}>Go to card</h3>
				<Select
					className={styles.selector}
					options={cards.map((_, i) => ({ value: i, label: `${i + 1}` }))}
					value={{ value: current, label: `${current + 1}` }}
					onChange={goTo}
				/>
			</div>
		</div>
	);
}

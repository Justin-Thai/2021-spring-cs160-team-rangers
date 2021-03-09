import React from 'react';

import { lang } from '../../../../config';
import styles from './styles.module.scss';

export default function Services() {
	const { title, flashCards, selfTests } = lang['en'].services;
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			<div className={styles.section}>
				<h1 className={styles.bulletTitle}>{flashCards.title}</h1>
				<ul className={styles.items}>
					{flashCards.items.map((item, i) => (
						<li key={i}>{item}</li>
					))}
				</ul>
			</div>
			<div className={styles.section}>
				<h1 className={styles.bulletTitle}>{selfTests.title}</h1>
				<ul className={styles.items}>
					{selfTests.items.map((item, i) => (
						<li key={i}>{item}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

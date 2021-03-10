import React from 'react';

import { lang } from '../../../../config';
import styles from './styles.module.scss';

export default function WhyUs() {
	const { title, subtitle, items } = lang['en'].whyUs;
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			<h2 className={styles.subtitle}>{subtitle}</h2>
			<ul className={styles.items}>
				{items.map((item, i) => (
					<li key={i}>
						<h3>{item.title}</h3>
						<p>{item.desc}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

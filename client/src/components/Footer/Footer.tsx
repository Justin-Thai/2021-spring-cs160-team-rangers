import React from 'react';

import styles from './styles.module.scss';

export default function Footer() {
	return (
		<footer className={styles.container}>
			<h1>{`Copyright © ${new Date().getFullYear()} Name. All rights reserved.`}</h1>
		</footer>
	);
}

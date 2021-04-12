import React from 'react';

import styles from './styles.module.scss';

export default function Empty() {
	return (
		<div className={styles.container}>
			<h2 className={styles.text}>Nothing here</h2>
		</div>
	);
}

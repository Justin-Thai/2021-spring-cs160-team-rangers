import React from 'react';

import styles from './styles.module.scss';

export default function ErrorView({ error }: { error: string }) {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<i className='fas fa-exclamation-triangle' style={{ color: 'grey' }}></i>
				<h2 className={styles.text}>{error}</h2>
			</div>
		</div>
	);
}

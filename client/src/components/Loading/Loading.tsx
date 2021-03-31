import React from 'react';

import styles from './styles.module.scss';

export default function Loading() {
	return (
		<div className={styles.container}>
			<i className='fas fa-spinner fa-pulse' style={{ fontSize: 36, color: 'grey' }}></i>
		</div>
	);
}

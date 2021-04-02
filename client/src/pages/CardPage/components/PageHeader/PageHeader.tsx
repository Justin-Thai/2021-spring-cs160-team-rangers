import React from 'react';

import styles from './styles.module.scss';

export default function PageHeader({ goBack }: { goBack: () => void }) {
	return (
		<div className={styles.container}>
			<i
				className='fas fa-angle-left'
				style={{ color: 'grey', fontSize: 36, marginLeft: 18, cursor: 'pointer' }}
				onClick={goBack}
			></i>
			<button className={`primary-btn ${styles.createBtn}`}>Create</button>
		</div>
	);
}

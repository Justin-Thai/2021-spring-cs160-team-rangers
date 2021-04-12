import React from 'react';

import styles from './styles.module.scss';

export default function SimplePageHeader({ title, goBack }: { title: string; goBack?: () => void }) {
	return (
		<div className={styles.container}>
			{goBack ? (
				<i
					className='fas fa-angle-left'
					style={{ color: 'grey', fontSize: 36, marginLeft: 18, cursor: 'pointer' }}
					onClick={goBack}
				></i>
			) : null}
			<h1 className={styles.title}>{title}</h1>
		</div>
	);
}

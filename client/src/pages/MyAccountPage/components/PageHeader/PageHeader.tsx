import React from 'react';

import styles from './styles.module.scss';

export default function PageHeader({ title, signOut }: { title: string; signOut: () => void }) {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			<button className={`primary-btn ${styles.btn}`} onClick={signOut}>
				Sign out
			</button>
		</div>
	);
}

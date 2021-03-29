import React from 'react';

import { PageHeader } from './components';
import styles from './styles.module.scss';

export default function DeckPage() {
	return (
		<div className={styles.container}>
			<PageHeader />
		</div>
	);
}

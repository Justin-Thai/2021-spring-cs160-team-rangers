import React from 'react';

import styles from './styles.module.scss';

interface PageHeaderProps {
	goBack: () => void;
}

export default function PageHeader({ goBack }: PageHeaderProps) {
	return (
		<div className={styles.container}>
			<i
				className='fas fa-angle-left'
				style={{ color: 'grey', fontSize: 36, marginLeft: 18, cursor: 'pointer' }}
				onClick={goBack}
			></i>
		</div>
	);
}

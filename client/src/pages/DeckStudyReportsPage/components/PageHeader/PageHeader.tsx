import React from 'react';

import styles from './styles.module.scss';

interface PageHeaderProps {
	goBack: () => void;
	createNewStudy: () => void;
}

export default function PageHeader({ goBack, createNewStudy }: PageHeaderProps) {
	return (
		<div className={styles.container}>
			<i
				className='fas fa-angle-left'
				style={{ color: 'grey', fontSize: 36, marginLeft: 18, cursor: 'pointer' }}
				onClick={goBack}
			></i>
			<div>
				<button className={`submit-btn ${styles.studyBtn}`} onClick={createNewStudy}>
					New study
				</button>
			</div>
		</div>
	);
}

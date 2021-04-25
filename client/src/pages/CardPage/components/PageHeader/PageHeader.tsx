import React from 'react';

import styles from './styles.module.scss';

interface PageHeaderProps {
	goToCardCreation: () => void;
	goBack: () => void;
	goToStudyReports: () => void;
}

export default function PageHeader({ goBack, goToCardCreation, goToStudyReports }: PageHeaderProps) {
	return (
		<div className={styles.container}>
			<i
				className='fas fa-angle-left'
				style={{ color: 'grey', fontSize: 36, marginLeft: 18, cursor: 'pointer' }}
				onClick={goBack}
			></i>
			<div>
				<button className={`primary-btn ${styles.createBtn}`} onClick={goToCardCreation}>
					Create new card
				</button>
				<button className={`submit-btn ${styles.studyBtn}`} onClick={goToStudyReports}>
					Study Reports
				</button>
			</div>
		</div>
	);
}

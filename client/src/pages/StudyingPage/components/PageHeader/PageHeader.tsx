import React from 'react';

import styles from './styles.module.scss';

interface PageHeaderProps {
	submitTest: () => void;
}

export default function PageHeader({ submitTest }: PageHeaderProps) {
	return (
		<div className={styles.container}>
			<div>
				<button className={`submit-btn ${styles.studyBtn}`} onClick={submitTest}>
					Submit test
				</button>
			</div>
		</div>
	);
}

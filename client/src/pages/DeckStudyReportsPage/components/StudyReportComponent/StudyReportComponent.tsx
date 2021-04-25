import React from 'react';

import { StudyReport } from '../../../../models';
import { shortenText, getMinutesDifference } from '../../../../utils';
import styles from './styles.module.scss';

interface StudyReportComponentProps {
	studyReport: StudyReport;
}

export default function StudyReportComponent({ studyReport }: StudyReportComponentProps) {
	const getAccuracy = () => {
		const { correctCount, incorrectCount } = studyReport;
		if (incorrectCount === 0) {
			return '--';
		}
		return `${(correctCount / incorrectCount) * 100}%`;
	};

	return (
		<div className={styles.container}>
			{/* <i className={`fas fa-edit ${styles.editIcon}`} style={{ cursor: 'pointer' }} onClick={performEditDeck}></i> */}
			{/* <i
				className={`fas fa-trash-alt ${styles.deleteIcon}`}
				style={{ cursor: 'pointer' }}
				onClick={performDeleteDeck}
			></i> */}
			<div className={styles.wrapper}>
				<div>
					<h3 className={styles.name}>{shortenText(studyReport.name, 15)}</h3>
				</div>
				<div className={styles.right}>
					<h3 className={styles.edit}>Took: {getMinutesDifference(studyReport.createdAt, studyReport.endAt)} min</h3>
					<h3 className={styles.edit}>Accuracy: {getAccuracy()}</h3>
				</div>
			</div>
		</div>
	);
}

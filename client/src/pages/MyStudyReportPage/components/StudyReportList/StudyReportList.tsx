import React from 'react';

import { StudyReport } from '../../../../models';
import StudyReportComponent from '../StudyReportComponent/StudyReportComponent';
import styles from './styles.module.scss';

interface StudyReportListProps {
	studyReports: StudyReport[];
}

export default function StudyReportList({ studyReports }: StudyReportListProps) {
	return (
		<div className={styles.container}>
			{studyReports.map((d) => (
				<StudyReportComponent key={d.id} studyReport={d} />
			))}
		</div>
	);
}

import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { SideNav } from './components';
import { PrivateRoute } from '../../components';
import DeckPage from '../DeckPage/DeckPage';
import MyAccountPage from '../MyAccountPage/MyAccountPage';
import PageNotFound from '../PageNotFound/PageNotFound';
import SharedPage from '../SharedPage/SharedPage';
import ReportPage from '../ReportPage/ReportPage';
import CardPage from '../CardPage/CardPage';
import DeckCreationPage from '../DeckCreationPage/DeckCreationPage';
import DeckEditPage from '../DeckEditPage/DeckEditPage';
import CardCreationPage from '../CardCreationPage/CardCreationPage';
import CardEditPage from '../CardEditPage/CardEditPage';
import DeckStudyReportsPage from '../DeckStudyReportsPage/DeckStudyReportsPage';
import styles from './styles.module.scss';

function Profile() {
	const { path, url } = useRouteMatch();

	return (
		<div className={styles.container}>
			<SideNav url={url} />
			<div className={styles.pages}>
				<Switch>
					<PrivateRoute exact path={path}>
						<MyAccountPage />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}/deck`}>
						<DeckPage />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}/deck/create`}>
						<DeckCreationPage />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}/deck/:deckId/edit`}>
						<DeckEditPage />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}/deck/:deckId/study`}>
						<DeckStudyReportsPage />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}/deck/:deckId/card/create`}>
						<CardCreationPage />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}/deck/:deckId/card/:cardId/edit`}>
						<CardEditPage />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}/deck/:deckId`}>
						<CardPage />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}/shared`}>
						<SharedPage />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}/report`}>
						<ReportPage />
					</PrivateRoute>
					<Route path='*'>
						<PageNotFound />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default Profile;

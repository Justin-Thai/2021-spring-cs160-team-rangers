import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { AppState } from '../../redux/store';
import { User } from '../../models';
import { SideNav } from './components';
import { PrivateRoute } from '../../components';
import DeckPage from '../DeckPage/DeckPage';
import MyAccount from '../MyAccount/MyAccount';
import PageNotFound from '../PageNotFound/PageNotFound';
import SharedPage from '../SharedPage/SharedPage';
import ReportPage from '../ReportPage/ReportPage';
import styles from './styles.module.scss';

interface ProfileProps {
	user: User | null;
}

function Profile({ user }: ProfileProps) {
	const { path, url } = useRouteMatch();
	if (!user) return null;
	return (
		<div className={styles.container}>
			<SideNav url={url} username={user.name} />
			<div className={styles.pages}>
				<Switch>
					<PrivateRoute exact path={path}>
						<MyAccount user={user} />
					</PrivateRoute>
					<PrivateRoute exact path={`${path}/deck`}>
						<DeckPage />
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

const mapStateToProps = (state: AppState) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(Profile);

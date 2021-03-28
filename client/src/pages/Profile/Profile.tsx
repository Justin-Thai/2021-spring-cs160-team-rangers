import React from 'react';
import { connect } from 'react-redux';
import { Switch, useRouteMatch } from 'react-router-dom';

import { AppState } from '../../redux/store';
import { User } from '../../models';
import { SideNav } from './components';
import { PrivateRoute } from '../../components';
import DeckPage from '../DeckPage/DeckPage';

interface ProfileProps {
	user: User | null;
}

function Profile({ user }: ProfileProps) {
	let { path, url } = useRouteMatch();
	if (!user) return null;
	return (
		<div style={{ marginTop: 100 }}>
			<SideNav url={url} />
			<Switch>
				<PrivateRoute exact path={`${path}/deck`}>
					<DeckPage />
				</PrivateRoute>
			</Switch>
		</div>
	);
}

const mapStateToProps = (state: AppState) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(Profile);

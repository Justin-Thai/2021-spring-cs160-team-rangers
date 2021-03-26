import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../redux/store';
import { User } from '../../models';
import { SideNav } from './components';

interface ProfileProps {
	user: User | null;
}

function Profile({ user }: ProfileProps) {
	if (!user) return null;
	return (
		<div>
			<h1>Profile</h1>
			<SideNav />
			<ul>
				<li>id: {user.id}</li>
				<li>email: {user.email}</li>
			</ul>
		</div>
	);
}

const mapStateToProps = (state: AppState) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(Profile);

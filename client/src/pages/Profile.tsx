import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../redux/store';
import { User } from '../models';

interface ProfileProps {
	user: User | null;
}

function Profile({ user }: ProfileProps) {
	if (!user) return null;
	return (
		<div>
			<h1>Profile</h1>
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

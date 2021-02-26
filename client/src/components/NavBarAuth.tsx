import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../redux/auth/actions';

interface NavBarAuthProps {
	onSignOut: () => void;
}

function NavBarAuth({ onSignOut }: NavBarAuthProps) {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/profile'>Profile</Link>
				</li>
				<li>
					<div style={{ cursor: 'pointer' }} onClick={onSignOut}>Sign out</div>
				</li>
			</ul>
		</nav>
	);
}

const mapDispatchToProps = {
	onSignOut: signOut,
};

export default connect(null, mapDispatchToProps)(NavBarAuth);

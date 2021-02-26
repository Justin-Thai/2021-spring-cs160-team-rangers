import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarNotAuth() {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/signup'>Sign up</Link>
				</li>
				<li>
					<Link to='/signin'>Sign in</Link>
				</li>
			</ul>
		</nav>
	);
}

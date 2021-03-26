import React from 'react';
import { Link } from 'react-router-dom';

export default function SideNav() {
	return (
		<ul>
			<li>
				<Link to='/'>My page</Link>
			</li>
			<li>
				<Link to='/'>Shared</Link>
			</li>

			<li>
				<Link to='/'>My study report</Link>
			</li>
		</ul>
	);
}

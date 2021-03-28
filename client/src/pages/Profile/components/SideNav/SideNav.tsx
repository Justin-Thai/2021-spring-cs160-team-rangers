import React from 'react';
import { Link } from 'react-router-dom';

export default function SideNav({ url }: { url: string }) {
	return (
		<ul>
			<li>
				<Link to={`${url}/deck`}>My decks</Link>
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

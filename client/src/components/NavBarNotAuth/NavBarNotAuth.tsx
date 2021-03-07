import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export default function NavBarNotAuth() {
	return (
		<nav className={styles.navBar}>
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

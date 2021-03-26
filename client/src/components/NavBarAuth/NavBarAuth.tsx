import React from 'react';
import { Link } from 'react-router-dom';

import { lang } from '../../config';
import styles from './styles.module.scss';

export default function NavBarAuth({ userId }: { userId: string }) {
	const { aboutUs, services, helpAndFAQ, contactUs, myPage } = lang['en'].nav;

	return (
		<nav className={styles.navBar}>
			<ul>
				<div className={styles.linksOuter}>
					<div className={styles.linksWrapper}>
						<li>
							<Link to='/'>{aboutUs}</Link>
						</li>
						<li>
							<Link to='/'>{services}</Link>
						</li>
						<li>
							<Link to='/'>{helpAndFAQ}</Link>
						</li>
						<li>
							<Link to='/'>{contactUs}</Link>
						</li>
					</div>
				</div>
				<li className={styles.myPage}>
					<Link to={`/profile/${userId}`}>{myPage}</Link>
				</li>
			</ul>
		</nav>
	);
}

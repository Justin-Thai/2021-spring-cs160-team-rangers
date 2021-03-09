import React from 'react';
import { Link } from 'react-router-dom';

import { lang } from '../../config';
import styles from './styles.module.scss';

export default function NavBarNotAuth() {
	const { aboutUs, services, helpAndFAQ, contactUs, language, login } = lang['en'].nav;

	return (
		<nav className={styles.navBar}>
			<ul>
				<div className={styles.linksOuter}>
					<div className={styles.linksWrapper}>
						<li>
							<Link to='/about'>{aboutUs}</Link>
						</li>
						<li>
							<Link to='/services'>{services}</Link>
						</li>
						<li>
							<Link to='/faq'>{helpAndFAQ}</Link>
						</li>
						<li>
							<Link to='/contact'>{contactUs}</Link>
						</li>
						<li>
							<Link to='/signin'>{language}</Link>
						</li>
					</div>
				</div>
				<li className={styles.login}>
					<Link to='/login'>{login}</Link>
				</li>
			</ul>
		</nav>
	);
}

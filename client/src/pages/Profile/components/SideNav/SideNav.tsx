import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

export default function SideNav({ url, username }: { url: string; username: string }) {
	const { pathname } = useLocation();
	return (
		<div className={styles.container}>
			<h1 className={styles.name}>{username}</h1>
			<Link to={url} className={`${styles.link} ${styles.myAccount}`}>
				My account
			</Link>
			<h1 className={styles.menu}>Menu</h1>
			<ul>
				<li style={pathname.includes('deck') ? { background: '#eee' } : {}}>
					<Link
						to={`${url}/deck`}
						className={styles.link}
						style={pathname.includes('deck') ? { color: '#3580F4' } : {}}
					>
						<i className='fas fa-cube'></i>
						My decks
					</Link>
				</li>
				<li style={pathname.includes('shared') ? { background: '#eee' } : {}}>
					<Link
						to={`${url}/shared`}
						className={styles.link}
						style={pathname.includes('shared') ? { color: '#3580F4' } : {}}
					>
						<i className='fas fa-share-alt'></i>
						Shared
					</Link>
				</li>
				<li style={pathname.includes('report') ? { background: '#eee' } : {}}>
					<Link
						to={`${url}/report`}
						className={styles.link}
						style={pathname.includes('report') ? { color: '#3580F4' } : {}}
					>
						<i className='fas fa-check-square'></i>
						My study report
					</Link>
				</li>
			</ul>
		</div>
	);
}

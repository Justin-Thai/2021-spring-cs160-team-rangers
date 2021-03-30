import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { AppState } from '../../../../redux/store';
import { checkPathIncludes } from '../../../../utils';
import styles from './styles.module.scss';

function SideNav({ url, username, didNavigateTo404 }: { url: string; username: string; didNavigateTo404: boolean }) {
	const { pathname } = useLocation();

	const isPathDeck = () => {
		if (didNavigateTo404) return false;
		return checkPathIncludes(pathname, 'deck');
	};

	const isPathShared = () => {
		if (didNavigateTo404) return false;
		return checkPathIncludes(pathname, 'shared');
	};

	const isPathReport = () => {
		if (didNavigateTo404) return false;
		return checkPathIncludes(pathname, 'report');
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.name}>{username}</h1>
			<Link to={url} className={`${styles.link} ${styles.myAccount}`}>
				My account
			</Link>
			<h1 className={styles.menu}>Menu</h1>
			<ul>
				<li style={isPathDeck() ? { background: '#eee' } : {}}>
					<Link to={`${url}/deck`} className={styles.link} style={isPathDeck() ? { color: '#3580F4' } : {}}>
						<i className='fas fa-cube'></i>
						My decks
					</Link>
				</li>
				<li style={isPathShared() ? { background: '#eee' } : {}}>
					<Link to={`${url}/shared`} className={styles.link} style={isPathShared() ? { color: '#3580F4' } : {}}>
						<i className='fas fa-share-alt'></i>
						Shared
					</Link>
				</li>
				<li style={isPathReport() ? { background: '#eee' } : {}}>
					<Link to={`${url}/report`} className={styles.link} style={isPathReport() ? { color: '#3580F4' } : {}}>
						<i className='fas fa-check-square'></i>
						My study report
					</Link>
				</li>
			</ul>
		</div>
	);
}

const mapStateToProps = (state: AppState) => ({
	didNavigateTo404: state.notFoundPageDetector.didNavigateTo404,
});

export default connect(mapStateToProps)(SideNav);

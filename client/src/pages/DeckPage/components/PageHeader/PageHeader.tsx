import React from 'react';

import styles from './styles.module.scss';

export default function PageHeader() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<form className={styles.form}>
					<div>
						<input className={styles.searchBar} type='text' placeholder='Search decks' />
						<button type='submit' className={`search-btn ${styles.searchBtn}`}>
							<i className='fas fa-search'></i>
						</button>
					</div>
				</form>
				<button className={`primary-btn ${styles.createBtn}`}>Create</button>
			</div>
		</div>
	);
}

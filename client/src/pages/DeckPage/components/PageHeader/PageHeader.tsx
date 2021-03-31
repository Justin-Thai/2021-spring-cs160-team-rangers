import React, { useState } from 'react';

import styles from './styles.module.scss';

export default function PageHeader({ performSearch }: { performSearch: (search: string) => void }) {
	const [searchValue, setSearchValue] = useState('');

	const onSetSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

	const submitSearch = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (searchValue) {
			performSearch(searchValue);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<form className={styles.form} onSubmit={submitSearch}>
					<div>
						<input
							className={styles.searchBar}
							type='text'
							placeholder='Search decks'
							value={searchValue}
							onChange={onSetSearchValue}
						/>
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

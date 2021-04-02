import React, { Component } from 'react';

import styles from './styles.module.scss';

interface PageHeaderProps {
	searchFromURI: string | null;
	performSearch: (search: string) => void;
	goToDeckCreation: () => void;
}

interface PageHeaderState {
	searchValue: string;
}

class PageHeader extends Component<PageHeaderProps, PageHeaderState> {
	state = {
		searchValue: this.props.searchFromURI ? this.props.searchFromURI : '',
	};

	componentDidUpdate(prevProps: PageHeaderProps, prevState: PageHeaderState) {
		const { searchFromURI } = this.props;
		const { searchValue } = this.state;
		if (
			searchFromURI !== prevProps.searchFromURI &&
			searchFromURI === null &&
			searchValue !== '' &&
			searchValue === prevState.searchValue
		) {
			this.setState({ searchValue: '' });
		}
	}

	onSetSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ searchValue: e.target.value });

	submitSearch = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { searchValue } = this.state;
		if (searchValue) {
			this.props.performSearch(searchValue);
		}
	};

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<form className={styles.form} onSubmit={this.submitSearch}>
						<div>
							<input
								className={styles.searchBar}
								type='text'
								placeholder='Search decks'
								value={this.state.searchValue}
								onChange={this.onSetSearchValue}
							/>
							<button type='submit' className={`submit-btn ${styles.searchBtn}`}>
								<i className='fas fa-search'></i>
							</button>
						</div>
					</form>
					<button className={`primary-btn ${styles.createBtn}`} onClick={this.props.goToDeckCreation}>
						Create
					</button>
				</div>
			</div>
		);
	}
}

export default PageHeader;

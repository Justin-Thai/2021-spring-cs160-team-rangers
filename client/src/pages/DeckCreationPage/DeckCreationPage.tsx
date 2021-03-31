import React, { Component } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { PageHeader } from './components';
import { createDeck, clearErrors } from '../../redux/deck/actions';
import styles from './styles.module.scss';
import { AppState } from '../../redux/store';

interface DeckCreationPageProps {
	history: History<unknown>;
	loading: boolean;
	userId: string;
	error: Error | null;
	onCreateDeck: (name: string) => void;
	onClearErrors: () => void;
}

interface DeckCreationPageState {
	name: string;
}

class DeckCreationPage extends Component<DeckCreationPageProps, DeckCreationPageState> {
	state = {
		name: '',
	};

	componentDidUpdate(prevProps: DeckCreationPageProps) {
		const { loading, error, history, userId } = this.props;
		if (loading !== prevProps.loading && !loading && !error) {
			history.replace(`/profile/${userId}/deck`);
		}
	}

	componentWillUnmount() {
		this.props.onClearErrors();
	}

	setName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value });

	goBack = () => this.props.history.goBack();

	onSubmitDeck = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { name } = this.state;
		if (name) {
			this.props.onCreateDeck(name);
		}
	};

	render() {
		const { loading, error } = this.props;
		return (
			<div className={styles.container}>
				<PageHeader goBack={this.goBack} />
				<div className={styles.wrapper}>
					<form onSubmit={this.onSubmitDeck}>
						<div className={styles.inputWrapper}>
							<input
								className={styles.textInput}
								type='text'
								placeholder='Enter deck name'
								value={this.state.name}
								onChange={this.setName}
							/>
						</div>
						{error ? <h3 className={styles.error}>Error message</h3> : null}
						<input
							className={`${loading ? 'disabled-btn' : 'submit-btn'} ${styles.submitBtn}`}
							type='submit'
							value='Save'
							disabled={loading}
						/>
					</form>
				</div>
			</div>
		);
	}
}

interface DeckCreationPageHOCProps {
	loading: boolean;
	userId: string;
	error: Error | null;
	onCreateDeck: (name: string) => void;
	onClearErrors: () => void;
}

function DeckCreationPageHOC(props: DeckCreationPageHOCProps) {
	const history = useHistory();
	return <DeckCreationPage {...props} history={history} />;
}

const mapStateToProps = (state: AppState) => ({
	userId: state.auth.user!.id as string,
	loading: state.deck.loadings.createDeckLoading,
	error: state.deck.errors.createDeckError,
});

const mapDispatchToProps = {
	onCreateDeck: createDeck,
	onClearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckCreationPageHOC);

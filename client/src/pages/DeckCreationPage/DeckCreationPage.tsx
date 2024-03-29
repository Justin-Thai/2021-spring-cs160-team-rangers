import React, { Component } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SimplePageHeader } from '../../components';
import { createDeck, clearErrors } from '../../redux/deck/actions';
import styles from './styles.module.scss';
import { AppState } from '../../redux/store';

interface DeckCreationPageHOCProps {
	loading: boolean;
	userId: string;
	error: Error | null;
	onCreateDeck: (name: string, shared?: boolean) => void;
	onClearErrors: () => void;
}

interface DeckCreationPageProps extends DeckCreationPageHOCProps {
	history: History<unknown>;
}

interface DeckCreationPageState {
	name: string;
	shared: boolean;
}

class DeckCreationPage extends Component<DeckCreationPageProps, DeckCreationPageState> {
	state = {
		name: '',
		shared: false,
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

	setShared = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ shared: e.target.checked });

	goBack = () => this.props.history.goBack();

	onSubmitDeck = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { name, shared } = this.state;
		if (name) {
			this.props.onCreateDeck(name, shared);
		}
	};

	render() {
		const { loading, error } = this.props;
		return (
			<div className={styles.container}>
				<SimplePageHeader title='Create new deck' goBack={this.goBack} />
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
							<br />
							<label className={styles.checkBoxWrapper}>
								Shared with link
								<input
									className={styles.checkbox}
									type='checkbox'
									checked={this.state.shared}
									onChange={this.setShared}
								/>
							</label>
						</div>
						{error ? <h3 className={styles.error}>{error.message}</h3> : null}
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

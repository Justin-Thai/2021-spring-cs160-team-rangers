import React, { Component } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';

import { SimplePageHeader } from '../../components';
import { editDeck, clearErrors } from '../../redux/deck/actions';
import styles from './styles.module.scss';
import { AppState } from '../../redux/store';

interface EditDeckPageHOCProps {
	userId: string;
	loading: boolean;
	error: Error | null;
	onEditDeck: (deckId: string, newName: string, newShared: boolean) => void;
	onClearErrors: () => void;
}

interface DeckEditPageProps extends EditDeckPageHOCProps {
	history: History<unknown>;
	deckId: string;
	deckName: string;
	deckShared: boolean;
	onEditDeck: (deckId: string, newName: string, newShared: boolean) => void;
	onClearErrors: () => void;
}

interface DeckEditPageState {
	name: string;
	shared: boolean;
}

class DeckEditPage extends Component<DeckEditPageProps, DeckEditPageState> {
	state = {
		name: this.props.deckName,
		shared: this.props.deckShared,
	};

	componentDidUpdate(prevProps: DeckEditPageProps) {
		const { loading, error, history, userId } = this.props;
		if (loading !== prevProps.loading && !loading && !error) {
			history.replace(`/profile/${userId}/deck`);
		}
	}

	componentWillUnmount() {
		this.props.onClearErrors();
	}

	goBack = () => this.props.history.goBack();

	setName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value });

	setShared = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ shared: e.target.checked });

	onEditDeck = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { name, shared } = this.state;
		const { deckId, onEditDeck } = this.props;
		if (name) {
			onEditDeck(deckId, name, shared);
		}
	};

	render() {
		const { loading, error } = this.props;
		return (
			<div className={styles.container}>
				<SimplePageHeader title='Edit deck' goBack={this.goBack} />
				<div className={styles.wrapper}>
					<form onSubmit={this.onEditDeck}>
						<div className={styles.inputWrapper}>
							<input
								className={styles.textInput}
								type='text'
								placeholder='Enter deck name'
								value={this.state.name}
								onChange={this.setName}
							/>
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

function EditDeckPageHOC(props: EditDeckPageHOCProps) {
	const { deckId } = useParams<{ deckId: string }>();
	const location = useLocation<{ deckName: string; deckShared: boolean }>();
	const { deckName, deckShared } = location.state;
	const history = useHistory();
	return <DeckEditPage {...props} history={history} deckId={deckId} deckName={deckName} deckShared={deckShared} />;
}

const mapStateToProps = (state: AppState) => ({
	userId: state.auth.user!.id as string,
	loading: state.deck.loadings.editDeckLoading,
	error: state.deck.errors.editDeckError,
});

const mapDispatchToProps = {
	onEditDeck: editDeck,
	onClearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDeckPageHOC);

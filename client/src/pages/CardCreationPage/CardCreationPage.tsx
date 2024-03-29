import React, { Component } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { SimplePageHeader, BackSideEditor } from '../../components';
import { createCard, clearErrors } from '../../redux/card/actions';
import styles from './styles.module.scss';
import { AppState } from '../../redux/store';

interface CardCreationPageHOCProps {
	loading: boolean;
	error: Error | null;
	onCreateCard: (deckId: string, front: string, back: string, plainBack: string) => void;
	onClearErrors: () => void;
}

interface CardCreationPageProps extends CardCreationPageHOCProps {
	history: History<unknown>;
	deckId: string;
}

interface CardCreationPageState {
	front: string;
	back: string;
	plainBack: string;
}

class CardCreationPage extends Component<CardCreationPageProps, CardCreationPageState> {
	state = {
		front: '',
		back: '',
		plainBack: '',
	};

	componentDidUpdate(prevProps: CardCreationPageProps) {
		const { loading, error } = this.props;
		if (loading !== prevProps.loading && !loading && !error) {
			this.goBack();
		}
	}

	componentWillUnmount() {
		this.props.onClearErrors();
	}

	setFront = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ front: e.target.value });

	setBack = (html: string) => this.setState({ back: html });

	goBack = () => this.props.history.goBack();

	onSubmitCard = () => {
		const { front, back, plainBack } = this.state;
		if (front && back) {
			const { onCreateCard, deckId } = this.props;
			onCreateCard(deckId, front, back, plainBack);
		}
	};

	setPlainBack = (text: string) => {
		// console.log(newPlainBack);
		this.setState({ plainBack: text });
	};

	render() {
		const { loading, error } = this.props;
		return (
			<div className={styles.container}>
				<SimplePageHeader title='Create new card' goBack={this.goBack} />
				<div className={styles.wrapper}>
					<div className={styles.front}>
						<input
							className={styles.frontInput}
							type='text'
							placeholder='Front side'
							value={this.state.front}
							onChange={this.setFront}
						/>
					</div>
					<div className={styles.back}>
						<BackSideEditor value={this.state.back} setBack={this.setBack} setPlainBack={this.setPlainBack} />
					</div>
				</div>
				<div className={styles.submit}>
					<button
						className={`${loading ? 'disabled-btn' : 'submit-btn'} ${styles.submitBtn}`}
						onClick={this.onSubmitCard}
					>
						Save
					</button>
					{error ? <h3 className={styles.error}>{error.message}</h3> : null}
				</div>
			</div>
		);
	}
}

function CardCreationPageHOC(props: CardCreationPageHOCProps) {
	const history = useHistory();
	const { deckId } = useParams<{ deckId: string }>();
	return <CardCreationPage {...props} history={history} deckId={deckId} />;
}

const mapStateToProps = (state: AppState) => ({
	loading: state.card.loadings.createCardLoading,
	error: state.card.errors.createCardError,
});

const mapDispatchToProps = {
	onCreateCard: createCard,
	onClearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardCreationPageHOC);

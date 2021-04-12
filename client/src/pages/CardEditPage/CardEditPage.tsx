import React, { Component } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';

import { BackSideEditor, SimplePageHeader } from '../../components';
import { editCard, clearErrors } from '../../redux/card/actions';
import styles from './styles.module.scss';
import { AppState } from '../../redux/store';

interface CardEditPageHOCProps {
	loading: boolean;
	error: Error | null;
	onEditCard: (deckId: string, cardId: string, front: string, back: string) => void;
	onClearErrors: () => void;
}

interface CardEditPageProps extends CardEditPageHOCProps {
	history: History<unknown>;
	deckId: string;
	cardId: string;
	frontSide: string;
	backSide: string;
}

interface CardEditPageState {
	front: string;
	back: string;
}

class CardEditPage extends Component<CardEditPageProps, CardEditPageState> {
	state = {
		front: this.props.frontSide,
		back: this.props.backSide,
	};

	componentDidUpdate(prevProps: CardEditPageProps) {
		const { loading, error } = this.props;
		if (loading !== prevProps.loading && !loading && !error) {
			this.goBack();
		}
	}

	componentWillUnmount() {
		this.props.onClearErrors();
	}

	goBack = () => this.props.history.goBack();

	setFront = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ front: e.target.value });

	setBack = (html: string) => this.setState({ back: html });

	onSubmitCardEdit = () => {
		const { front, back } = this.state;
		if (front && back) {
			const { onEditCard, deckId, cardId } = this.props;
			onEditCard(deckId, cardId, front, back);
		}
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
						<BackSideEditor value={this.state.back} setBack={this.setBack} />
					</div>
				</div>
				<div className={styles.submit}>
					<button
						className={`${loading ? 'disabled-btn' : 'submit-btn'} ${styles.submitBtn}`}
						onClick={this.onSubmitCardEdit}
					>
						Save
					</button>
					{error ? <h3 className={styles.error}>{error.message}</h3> : null}
				</div>
			</div>
		);
	}
}

function CardEditPageHOC(props: CardEditPageHOCProps) {
	const { deckId, cardId } = useParams<{ deckId: string; cardId: string }>();
	const location = useLocation<{ frontSide: string; backSide: string }>();
	const { frontSide, backSide } = location.state;
	const history = useHistory();
	return (
		<CardEditPage
			{...props}
			history={history}
			deckId={deckId}
			cardId={cardId}
			frontSide={frontSide}
			backSide={backSide}
		/>
	);
}

const mapStateToProps = (state: AppState) => ({
	loading: state.card.loadings.editCardLoading,
	error: state.card.errors.editCardError,
});

const mapDispatchToProps = {
	onEditCard: editCard,
	onClearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardEditPageHOC);

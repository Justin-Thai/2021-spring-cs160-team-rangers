import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { History } from 'history';

import { env } from '../../config';
import { AppState } from '../../redux/store';
import styles from './styles.module.scss';
import { PageHeader } from './components';

interface StudyingPageProps {
	history: History<unknown>;
	url: string;
	userId: string;
	reportCount: number;
	deckId: string;
	studyId: string;
	cardId: string;
	cardIds: number[];
}

interface StudyingPageState {
	fetchedFrontSide: string;
	answer: string;
	correct: boolean | null;
}

class StudyingPage extends Component<StudyingPageProps, StudyingPageState> {
	state = {
		fetchedFrontSide: '',
		answer: '',
		correct: null,
	};

	async componentDidMount() {
		const token = localStorage.getItem('token');
		if (!token) return;
		const { userId, deckId, studyId, cardId } = this.props;
		const res = await fetch(`${env.serverUrl}/profile/${userId}/deck/${deckId}/study/${studyId}/${cardId}`, {
			method: 'GET',
			headers: {
				token,
			},
		});

		const data = await res.json();
		if (res.status === 200) {
			this.setState({ fetchedFrontSide: data.front_side });
		}
	}

	componentDidUpdate(prevProps: StudyingPageProps, prevState: StudyingPageState) {
		const { cardId, cardIds } = this.props;
		if (cardId !== prevProps.cardId) {
			this.setState({ correct: null, answer: '' });
			const token = localStorage.getItem('token');
			if (!token) return;
			const { userId, deckId, studyId, cardId } = this.props;
			fetch(`${env.serverUrl}/profile/${userId}/deck/${deckId}/study/${studyId}/${cardId}`, {
				method: 'GET',
				headers: {
					token,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					this.setState({ fetchedFrontSide: data.front_side });
				});
		}
	}

	goNext = () => {
		const { url, history, cardIds, cardId, deckId } = this.props;
		const index = cardIds.findIndex((id) => cardId === String(id));
		if (index === cardIds.length - 1) {
			return;
		}
		if (index > -1) {
			const lastIndex = url.lastIndexOf('/');
			const newUrl = url.substring(0, lastIndex);
			history.push({ pathname: `${newUrl}/${cardIds[index + 1]}`, state: { cardIds, deckId } });
		}
	};

	goPrev = () => {
		const { url, history, cardIds, cardId, deckId } = this.props;
		const index = cardIds.findIndex((id) => cardId === String(id));
		if (index === 0) return;
		if (index > -1) {
			const lastIndex = url.lastIndexOf('/');
			const newUrl = url.substring(0, lastIndex);
			history.push({ pathname: `${newUrl}/${cardIds[index - 1]}`, state: { cardIds, deckId } });
		}
	};

	setAnswer = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ answer: e.target.value, correct: null });

	submitAnswer = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { answer, correct } = this.state;
		if (!answer || correct) return;
		const { userId, deckId, studyId, cardId } = this.props;
		const token = localStorage.getItem('token');
		if (!token) return;
		fetch(`${env.serverUrl}/profile/${userId}/deck/${deckId}/study/${studyId}/${cardId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token,
			},
			body: JSON.stringify({ answer }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.correct) {
					this.setState({ correct: true });
				} else {
					this.setState({ correct: false });
				}
			});
	};

	renderResult = () => {
		const { correct } = this.state;
		if (correct === null) return <h3>&#8193;</h3>;
		if (correct) {
			return (
				<h3 className={styles.result} style={{ color: '#009900' }}>
					Correct
				</h3>
			);
		}
		return (
			<h3 className={styles.result} style={{ color: '#ed4337' }}>
				Incorrect
			</h3>
		);
	};

	submitTest = () => {
		const { userId, deckId, studyId, reportCount, history } = this.props;
		const token = localStorage.getItem('token');
		if (!token) return;
		fetch(`${env.serverUrl}/profile/${userId}/deck/${deckId}/study/${studyId}/end`, {
			method: 'PUT',
			headers: {
				token,
			},
		})
			.then((res) => res.json())
			.then(() => {
				history.push({ pathname: `/profile/${userId}/deck/${deckId}/study`, state: { reportCount } });
			});
	};

	render() {
		return (
			<div className={styles.container}>
				<PageHeader submitTest={this.submitTest} />
				<div className={styles.wrapper}>
					<i className={`fas fa-angle-left ${styles.arrow}`} onClick={this.goPrev}></i>
					<div className={styles.card}>
						<h1 className={styles.front}>{this.state.fetchedFrontSide}</h1>
						<br />
						<form onSubmit={this.submitAnswer}>
							<input className={styles.answer} type='text' value={this.state.answer} onChange={this.setAnswer} />
							<br />
							<input className={`primary-btn ${styles.submitAnswer}`} type='submit' value='Submit' />
						</form>
						{this.renderResult()}
					</div>
					<i className={`fas fa-angle-right ${styles.arrow}`} onClick={this.goNext}></i>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	userId: state.auth.user!.id,
});

const mapDispatchToProps = {};

const ComponentWithProps = connect(mapStateToProps, mapDispatchToProps)(StudyingPage);

function HOCStudyingPage() {
	const history = useHistory();
	const { studyId, cardId } = useParams<{ studyId: string; cardId: string }>();
	const location = useLocation<{ cardIds: number[]; deckId: string; reportCount: number }>();
	const { url } = useRouteMatch();

	if (!location.state) {
		return (
			<div>
				<h2>Something went wrong.</h2>
				<details style={{ whiteSpace: 'pre-wrap' }}>Unknown error occured</details>
			</div>
		);
	}
	const { cardIds, deckId, reportCount } = location.state;
	return (
		<ComponentWithProps
			url={url}
			history={history}
			studyId={studyId}
			cardId={cardId}
			cardIds={cardIds}
			deckId={deckId}
			reportCount={reportCount}
		/>
	);
}

export default HOCStudyingPage;

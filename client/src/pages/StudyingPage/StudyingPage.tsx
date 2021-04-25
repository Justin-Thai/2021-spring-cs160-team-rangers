import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { History } from 'history';

import { env } from '../../config';
import { AppState } from '../../redux/store';

interface StudyingPageProps {
	history: History<unknown>;
	url: string;
	userId: string;
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

	setAnswer = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ answer: e.target.value });

	submitAnswer = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { answer } = this.state;
		if (!answer) return;
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
		if (correct === null) return null;
		if (correct) {
			return <p>correct</p>;
		}
		return <p>incorrect</p>;
	};

	render() {
		return (
			<div>
				<h1>studying</h1>
				{this.state.fetchedFrontSide}
				<br />
				<form onSubmit={this.submitAnswer}>
					<input type='text' value={this.state.answer} onChange={this.setAnswer} />
					<input type='submit' value='Submit' />
				</form>
				{this.renderResult()}
				<div onClick={this.goNext}>next</div>
				<div onClick={this.goPrev}>prev</div>
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
	const location = useLocation<{ cardIds: number[]; deckId: string }>();
	const { url } = useRouteMatch();

	if (!location.state) {
		return (
			<div>
				<h2>Something went wrong.</h2>
				<details style={{ whiteSpace: 'pre-wrap' }}>Unknown error occured</details>
			</div>
		);
	}
	const { cardIds, deckId } = location.state;

	return (
		<ComponentWithProps
			url={url}
			history={history}
			studyId={studyId}
			cardId={cardId}
			cardIds={cardIds}
			deckId={deckId}
		/>
	);
}

export default HOCStudyingPage;

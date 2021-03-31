import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { History } from 'history';

import { AppState } from '../../redux/store';
import { logIn, clearError } from '../../redux/auth/actions';
import { User } from '../../models';

interface LogInProps {
	history: History<unknown>;
	user: User | null;
	loading: boolean;
	error: Error | null;
	onLogIn: (email: string, password: string) => void;
	onClearError: () => void;
}

interface LogInState {
	email: string;
	password: string;
}

class LogIn extends Component<LogInProps, LogInState> {
	state = {
		email: '',
		password: '',
	};

	componentWillUnmount() {
		this.props.onClearError();
	}

	componentDidUpdate() {
		if (this.props.user) {
			this.props.history.push('/');
		}
	}

	setEmail = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value });

	setPassword = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value });

	submit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { email, password } = this.state;
		this.props.onLogIn(email, password);
	};

	render() {
		const { email, password } = this.state;
		const { user, error, history, loading } = this.props;

		if (user) {
			return (
				<Redirect
					to={{
						pathname: '/',
						state: {
							from: history.location,
						},
					}}
				/>
			);
		}

		return (
			<form onSubmit={this.submit} style={{ marginTop: 100 }}>
				email <input type='email' value={email} onChange={this.setEmail} />
				<br />
				password <input type='password' value={password} onChange={this.setPassword} />
				<br />
				<input type='submit' value={loading ? 'Loading' : 'Sign in'} />
				<br />
				{error && error!.message}
			</form>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	return {
		user: state.auth.user,
		loading: state.auth.loadings.signInLoading,
		error: state.auth.errors.signInError,
	};
};

const mapDispatchToProps = {
	onLogIn: logIn,
	onClearError: clearError,
};

const SignInComponent = connect(mapStateToProps, mapDispatchToProps)(LogIn);

export default function HOCSignIn() {
	const history = useHistory();
	return <SignInComponent history={history} />;
}

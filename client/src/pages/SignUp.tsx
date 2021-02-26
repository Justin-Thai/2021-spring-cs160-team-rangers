import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { History } from 'history';

import { AppState } from '../redux/store';
import { signUp, clearError } from '../redux/auth/actions';
import { User } from '../models';

interface SignUpProps {
	history: History<unknown>;
	user: User | null;
	loading: boolean;
	error: Error | null;
	onSignUp: (email: string, password: string) => void;
	onClearError: () => void;
}

interface SignUpState {
	email: string;
	password: string;
}

class SignUp extends Component<SignUpProps, SignUpState> {
	state = {
		email: '',
		password: '',
	};

	componentWillUnmount() {
		this.props.onClearError();
	}

	componentDidUpdate(prevProps: SignUpProps) {
		if (prevProps.user !== this.props.user) {
			this.props.history.push('/');
		}
	}

	setEmail = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value });

	setPassword = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value });

	submit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { email, password } = this.state;
		this.props.onSignUp(email, password);
	};

	render() {
		const { email, password } = this.state;
		const { user, error, history } = this.props;

        if (user) {
            return <Redirect to={{
                pathname: '/',
                state: {
                    from: history.location
                }
            }} />
        }

		return (
			<form onSubmit={this.submit}>
				email <input type='email' value={email} onChange={this.setEmail} />
				<br />
				password <input type='password' value={password} onChange={this.setPassword} />
				<br />
				<input type='submit' value='Sign up' />
				<br />
				{error && error!.message}
			</form>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	return {
		user: state.auth.user,
		loading: state.auth.loadings.signUpLoading,
		error: state.auth.errors.signUpError,
	};
};

const mapDispatchToProps = {
	onSignUp: signUp,
	onClearError: clearError,
};

const SignUpComponent = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default function HOCSignUp() {
	const history = useHistory();
	return <SignUpComponent history={history} />;
}

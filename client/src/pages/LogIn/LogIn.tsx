import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { History } from 'history';

import { AppState } from '../../redux/store';
import { logIn, clearError } from '../../redux/auth/actions';
import { User } from '../../models';
import background from './background.png';
import styles from './styles.module.scss';

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

	goBack = () => this.props.history.goBack();

	submit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { email, password } = this.state;
		this.props.onLogIn(email, password);
	};

	goToSignUp = () => this.props.history.push('/signup');

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
			<div className={styles.container}>
				<h3 className={styles.back} onClick={this.goBack}>
					← Back to home page
				</h3>
				<div className={styles.formWrapper}>
					<form className={styles.form} onSubmit={this.submit}>
						<h1 className={styles.title}>Login with email</h1>
						<div className={styles.inputWrapper}>
							<i className={`fas fa-envelope ${styles.icon}`}></i>
							<input className={styles.input} type='email' value={email} placeholder='email' onChange={this.setEmail} />
						</div>

						<div className={styles.inputWrapper}>
							<i className={`fas fa-lock ${styles.icon}`}></i>
							<input
								className={styles.input}
								type='password'
								value={password}
								placeholder='password'
								onChange={this.setPassword}
							/>
						</div>
						<h4 className={styles.error}>{error && error!.message}</h4>
						<input className={`submit-btn ${styles.submitBtn}`} type='submit' value={loading ? 'Loading' : 'Log in'} />
					</form>
					<h4 className={styles.signUp}>
						Don't have an account yet?{' '}
						<span className={styles.signUpText} onClick={this.goToSignUp}>
							Sign Up
						</span>
					</h4>
				</div>
				<div className={styles.rightBackground}>
					<img className={styles.img} src={background} alt='background' />
				</div>
			</div>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { History } from 'history';

import { AppState } from '../../redux/store';
import { signUp, clearError } from '../../redux/auth/actions';
import { User } from '../../models';
import background from '../../assets/background.png';
import styles from './styles.module.scss';

interface SignUpProps {
	history: History<unknown>;
	user: User | null;
	loading: boolean;
	error: Error | null;
	onSignUp: (email: string, name: string, password: string, retypePassword: string) => void;
	onClearError: () => void;
}

interface SignUpState {
	email: string;
	password: string;
	retypePassword: string;
	name: string;
}

class SignUp extends Component<SignUpProps, SignUpState> {
	state = {
		email: '',
		name: '',
		password: '',
		retypePassword: '',
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

	setRetypePassword = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ retypePassword: e.target.value });

	setName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value });

	submit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { email, name, password, retypePassword } = this.state;
		this.props.onSignUp(name, email, password, retypePassword);
	};

	render() {
		const { email, password, name, retypePassword } = this.state;
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
				<h3 className={styles.back} onClick={this.props.history.goBack}>
					← Back to log in
				</h3>
				<div className={styles.formWrapper}>
					<form className={styles.form} onSubmit={this.submit}>
						<h1 className={styles.title}>Sign up with email</h1>
						<div className={styles.inputWrapper}>
							<i className={`fas fa-user ${styles.icon}`}></i>
							<input className={styles.input} type='text' value={name} placeholder='name' onChange={this.setName} />
						</div>
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
						<div className={styles.inputWrapper}>
							<i className={`fas fa-lock ${styles.icon}`}></i>
							<input
								className={styles.input}
								type='password'
								value={retypePassword}
								placeholder='confirm password'
								onChange={this.setRetypePassword}
							/>
						</div>
						<h4 className={styles.error}>{error && error!.message}</h4>
						<input className={`submit-btn ${styles.submitBtn}`} type='submit' value={loading ? 'Loading' : 'Sign up'} />
					</form>
				</div>
				<div
					className={styles.rightBackground}
					style={{ background: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
				>
					<h2 className={styles.text}>Sign up for your own flashcards!!</h2>
				</div>
			</div>
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

// import React from 'react'

// import background from './background.png';
// import styles from './styles.module.scss';
// export default function SignUp() {
// 	return (
// 		<div>
// 		<div className={styles.container}>
// 			<div className={styles.center}>
// 				<h1>SignUp with Email</h1>
// 				<form>
// 					<div className={styles.txt_field}>
// 						<input type='text' required />
// 						<span></span>
// 						<label>Email</label>
// 					</div>
// 					<div className={styles.txt_field}>
// 						<input type='password' required />
// 						<span></span>
// 						<label>Password</label>
// 					</div>
// 					<div className={styles.txt_field}>
// 						<input type='password' required />
// 						<span></span>
// 						<label>Confirm Password</label>
// 					</div>
// 					<div className={styles.txt_field}>
// 						<input type='text' required />
// 						<span></span>
// 						<label>Choose Role</label>
// 					</div>
// 					<div className={styles.check}>
// 						<i className='far fa-check-square'></i> By signing up for Adutrans, you agree to our Terms of
// 							Service and Privacy Policy.
// 					</div>
// 					<input type='submit' value='SignUp' />
// 					<div className={styles.signup_link}>
// 						Already have an account? <a href='#'>Login</a>
// 					</div>
// 					<div className={styles.bottom}>
// 						<i className='fab fa-google'></i>
// 						<span>Google to SignUp</span>
// 					</div>
// 				</form>
// 			</div>

// 			<img className={styles.image} src={background} />
// 		</div>
// 	</div>
// 	)
// }

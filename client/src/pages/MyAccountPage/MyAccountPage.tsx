import React, { Component } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import { User } from '../../models';
import { AppState } from '../../redux/store';
import { PageHeader } from './components';
import { editProfile, signOut } from '../../redux/auth/actions';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

interface MyAccountPageHOCProps {
	user: User;
	loading: boolean;
	error: Error | null;
	onEditProfile: (email: string, name: string) => void;
	onSignOut: () => void;
}

interface MyAccountPageProps extends MyAccountPageHOCProps {
	history: History<unknown>;
}

interface MyAccountPageState {
	name: string;
	email: string;
}

class MyAccountPage extends Component<MyAccountPageProps, MyAccountPageState> {
	state = {
		name: this.props.user.name,
		email: this.props.user.email,
	};

	setName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value });

	setEmail = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value });

	performSignOut = () => {
		const { history, onSignOut } = this.props;
		onSignOut();
		history.push('/');
	};

	submit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { name, email } = this.state;
		if (name && email) {
			this.props.onEditProfile(name, email);
		}
	};

	render() {
		const { name, email } = this.state;
		const { loading, error } = this.props;
		return (
			<div className={styles.container}>
				<PageHeader title='My Account' signOut={this.performSignOut} />
				<div className={styles.wrapper}>
					<form onSubmit={this.submit}>
						<h2>Name</h2>
						<input className={styles.input} type='text' value={name} onChange={this.setName} />
						<h2>Email</h2>
						<input className={styles.input} type='email' value={email} onChange={this.setEmail} />
						<br />
						{error ? <h3 className={styles.error}>{error.message}</h3> : null}
						<input
							type='submit'
							className={`submit-btn ${styles.submitBtn}`}
							value={loading ? 'Loading' : 'Save'}
							disabled={loading}
						/>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	user: state.auth.user as User,
	loading: state.auth.loadings.editProfileLoading,
	error: state.auth.errors.editProfileError,
});

const mapDispatchToProps = {
	onEditProfile: editProfile,
	onSignOut: signOut,
};

function MyAccountPageHOC(props: MyAccountPageHOCProps) {
	const history = useHistory();
	return <MyAccountPage {...props} history={history} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPageHOC);

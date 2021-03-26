import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NavBarNotAuth, NavBarAuth, PrivateRoute, Footer } from './components';
import { Home, SignUp, Profile, LogIn } from './pages';
import { User } from './models';
import { checkAuth } from './redux/auth/actions';
import { AppState } from './redux/store';

interface RootProps {
	user: User | null;
	onCheckAuth: () => void;
}

class Root extends Component<RootProps, {}> {
	componentDidMount() {
		this.props.onCheckAuth();
	}

	render() {
		return (
			<Router>
				{this.props.user ? <NavBarAuth /> : <NavBarNotAuth />}
				<Switch>
					<Route exact path='/signup'>
						<SignUp />
					</Route>
					<Route exact path='/login'>
						<LogIn />
					</Route>
					<PrivateRoute exact path='/profile'>
						<Profile />
					</PrivateRoute>
					<Route path='/'>
						<Home />
					</Route>
				</Switch>
				<Footer />
			</Router>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	return {
		user: state.auth.user,
	};
};

const mapDispatchToProps = {
	onCheckAuth: checkAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);

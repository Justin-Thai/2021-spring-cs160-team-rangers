import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import { NavBarNotAuth, NavBarAuth, PrivateRoute, Footer } from './components';
import { Home, SignUp, Profile, LogIn, PageNotFound } from './pages';
import { User } from './models';
import { checkAuth } from './redux/auth/actions';
import { AppState } from './redux/store';

interface RootProps {
	user: User | null;
	pathname: string;
	onCheckAuth: () => void;
}

class Root extends Component<RootProps, {}> {
	componentDidMount() {
		this.props.onCheckAuth();
	}

	renderNav = () => {
		const { user, pathname } = this.props;
		if (pathname.includes('profile')) return null;
		return user ? <NavBarAuth userId={user.id} /> : <NavBarNotAuth />;
	};

	renderFooter = () => {
		if (!this.props.pathname.includes('profile')) return <Footer />;
	};

	render() {
		return (
			<>
				{this.renderNav()}
				<Switch>
					<Route exact path='/signup'>
						<SignUp />
					</Route>
					<Route exact path='/login'>
						<LogIn />
					</Route>
					<PrivateRoute path='/profile/:userId'>
						<Profile />
					</PrivateRoute>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='*'>
						<PageNotFound />
					</Route>
				</Switch>
				{this.renderFooter()}
			</>
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

interface RootHOCProps {
	user: User | null;
	onCheckAuth: () => void;
}

function RootHOC(props: RootHOCProps) {
	const { pathname } = useLocation();
	return <Root {...props} pathname={pathname} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(RootHOC);

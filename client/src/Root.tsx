import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import { NavBarNotAuth, NavBarAuth, PrivateRoute, Footer } from './components';
import { Home, SignUp, Profile, LogIn, PageNotFound, PublicDeck } from './pages';
import { User } from './models';
import { checkAuth } from './redux/auth/actions';
import { AppState } from './redux/store';
import { checkPathIncludes } from './utils';

interface RootProps {
	didNavigateTo404: boolean;
	user: User | null;
	pathname: string;
	onCheckAuth: () => void;
}

class Root extends Component<RootProps, {}> {
	componentDidMount() {
		this.props.onCheckAuth();
	}

	renderNav = () => {
		const { user, pathname, didNavigateTo404 } = this.props;
		if (didNavigateTo404) return null;
		if (checkPathIncludes(pathname, 'profile')) return null;
		if (checkPathIncludes(pathname, 'login')) return null;
		if (checkPathIncludes(pathname, 'signup')) return null;
		if (checkPathIncludes(pathname, 'deck')) return null;
		return user ? <NavBarAuth userId={user.id} /> : <NavBarNotAuth />;
	};

	renderFooter = () => {
		const { pathname, didNavigateTo404 } = this.props;
		if (didNavigateTo404) return null;
		if (checkPathIncludes(pathname, 'profile')) return null;
		if (checkPathIncludes(pathname, 'login')) return null;
		if (checkPathIncludes(pathname, 'signup')) return null;
		if (checkPathIncludes(pathname, 'deck')) return null;
		return <Footer />;
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
					<Route exact path='/deck/:deckId'>
						<PublicDeck />
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
		didNavigateTo404: state.notFoundPageDetector.didNavigateTo404,
		user: state.auth.user,
	};
};

const mapDispatchToProps = {
	onCheckAuth: checkAuth,
};

interface RootHOCProps {
	didNavigateTo404: boolean;
	user: User | null;
	onCheckAuth: () => void;
}

function RootHOC(props: RootHOCProps) {
	const { pathname } = useLocation();
	return <Root {...props} pathname={pathname} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(RootHOC);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps, useParams } from 'react-router-dom';

import { User } from '../models';
import { AppState } from '../redux/store';
import { checkAuth } from '../redux/auth/actions';

interface PrivateRouteProps extends RouteProps {
	children: React.ReactNode;
	user: User | null;
	loading: boolean;
	onCheckAuth: () => void;
}

interface PrivateRouteState {
	didCheckAuth: boolean;
}

class PrivateRoute extends Component<PrivateRouteProps, PrivateRouteState> {
	state = {
		didCheckAuth: false,
	};

	componentDidMount() {
		if (!this.props.user) {
			this.props.onCheckAuth();
		}
	}

	componentDidUpdate(prevProps: PrivateRouteProps) {
		if (prevProps.loading !== this.props.loading && this.props.loading === true) {
			this.setState({ didCheckAuth: true });
		}
	}

	render() {
		const { user, loading, children, ...rest } = this.props;

		if (!this.state.didCheckAuth && !user) {
			return null;
		}

		if (loading) {
			return <div>loading</div>;
		}

		return (
			<Route
				{...rest}
				render={({ location }) =>
					user ? (
						children
					) : (
						<Redirect
							to={{
								pathname: '/',
								state: { from: location },
							}}
						/>
					)
				}
			/>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	return {
		user: state.auth.user,
		loading: state.auth.loadings.checkAuthLoading,
	};
};

const mapDispatchToProps = {
	onCheckAuth: checkAuth,
};

function Children({ children, user }: { children: React.ReactNode; user: User }): JSX.Element {
	let { userId } = useParams<{ userId: string }>();
	if (userId !== user.id) {
		return (
			<Redirect
				to={{
					pathname: '/',
				}}
			/>
		);
	}
	return children as JSX.Element;
}

interface HOCPrivateRouteProps extends RouteProps {
	children: React.ReactNode;
	user: User | null;
	loading: boolean;
	onCheckAuth: () => void;
}

function HOCPrivateRoute({ children, ...rest }: HOCPrivateRouteProps) {
	const { user } = rest;
	return <PrivateRoute {...rest} children={<Children children={children} user={user as User} />} />;
}

const PrivateRouteComponent = connect(mapStateToProps, mapDispatchToProps)(HOCPrivateRoute);

export default PrivateRouteComponent;

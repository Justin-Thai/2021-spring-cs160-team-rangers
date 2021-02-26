import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

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
		this.props.onCheckAuth();
	}

	componentDidUpdate(prevProps: PrivateRouteProps) {
		if (prevProps.loading !== this.props.loading) {
			this.setState({ didCheckAuth: true });
		}
	}

	render() {
		const { user, loading, children, ...rest } = this.props;

		if (!this.state.didCheckAuth) {
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

const PrivateRouteComponent = connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

interface HOCPrivateRouteProps extends RouteProps {
	children: React.ReactNode;
}

export default function HOCPrivateRoute({ children, ...rest }: HOCPrivateRouteProps) {
	return <PrivateRouteComponent {...rest} children={children} />;
}

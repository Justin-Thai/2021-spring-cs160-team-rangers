import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { User } from '../models';
import { AppState } from '../redux/store';

interface PrivateRouteProps extends RouteProps {
	children: React.ReactNode;
	user: User | null;
}

function PrivateRoute({ children, user, ...rest }: PrivateRouteProps) {
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

const mapStateToProps = (state: AppState) => {
	return {
		user: state.auth.user,
	};
};

const PrivateRouteComponent = connect(mapStateToProps, {})(PrivateRoute);

interface HOCPrivateRouteProps extends RouteProps {
	children: React.ReactNode;
}

export default function HOCPrivateRoute({ children, ...rest }: HOCPrivateRouteProps) {
	return <PrivateRouteComponent {...rest} children={children} />;
}

import React from 'react';

import { User } from '../../models';

interface MyAccountProps {
	user: User;
}

export default function MyAccount(props: MyAccountProps) {
	const { user } = props;
	return (
		<ul>
			<li>id: {user.id}</li>
			<li>email: {user.email}</li>
		</ul>
	);
}

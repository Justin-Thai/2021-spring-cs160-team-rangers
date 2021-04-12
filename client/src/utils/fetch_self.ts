import { env } from '../config';

import { User } from '../models';

export default async function fetchSelf(authToken: string, userId: string): Promise<User> {
	try {
		const res = await fetch(`${env.serverUrl}/profile/${userId}`, {
			method: 'GET',
			headers: {
				token: authToken,
			},
		});

		const data = await res.json();
		if (res.status !== 200) {
			throw new Error(data.message);
		}

		const user = {
			id: userId,
			email: data.user.email,
			name: data.user.name,
			deckCount: data.user.deck_count,
		};

		return user;
	} catch (err) {
		throw err;
	}
}

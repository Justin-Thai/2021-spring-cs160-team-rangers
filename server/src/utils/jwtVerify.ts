import jwt from 'jsonwebtoken';

import { envConfig } from '../config';

export default function jwtVerify(token: string) {
	const { jwtSecretKey } = envConfig();
	try {
		jwt.verify(token, jwtSecretKey);
		return true;
	} catch (err) {
		return false;
	}
}

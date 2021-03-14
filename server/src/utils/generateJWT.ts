import jwt from 'jsonwebtoken';

import { User } from '../database/entity';
import { envConfig, appConfig } from '../config';

export default function generateJWT(user: User) {
	const { jwtSecretKey } = envConfig;
	const { jwtExpire } = appConfig;
	return jwt.sign(user.toInsensitiveJSON(), jwtSecretKey, { expiresIn: jwtExpire });
}

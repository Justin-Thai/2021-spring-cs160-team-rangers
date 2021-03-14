import jwt from 'jsonwebtoken';

export default function decodeJWT(token: string) {
	return jwt.decode(token) as {
		[key: string]: any;
	};
}

import jwt from 'jsonwebtoken';

export default function jwtDecode(token: string) {
	return jwt.decode(token);
}

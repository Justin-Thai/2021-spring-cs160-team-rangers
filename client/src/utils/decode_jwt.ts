import jwt from 'jsonwebtoken';

export default function decodeJWT(token: string) {
	const decodedData = jwt.decode(token) as {
		[key: string]: any;
	} | null;

	return decodedData;
}

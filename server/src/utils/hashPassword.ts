import bcrypt from 'bcrypt';
import { appConfig } from '../config';

export default async function hashPassword(password: string) {
	const { saltRounds } = appConfig;
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (err) {
		throw err as Error;
	}
}

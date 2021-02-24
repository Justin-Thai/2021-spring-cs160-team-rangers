import { IsEmail, Length } from 'class-validator';
import { Entity, Column, getRepository } from 'typeorm';

import Model from './Model';

@Entity('user')
export default class User extends Model {
	@Column()
	@Length(1, 255)
	@IsEmail()
	email: string;

	@Column()
	password: string;

	static async getAll() {
		const users = await getRepository(User).find();
		return users;
	}

	static async getOne(userId: number) {
		const user = await getRepository(User).findOne(userId);
		return user;
	}
}

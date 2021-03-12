import { IsEmail, Length } from 'class-validator';
import { Entity, Column, getRepository } from 'typeorm';

import Model from './Model';

@Entity('users')
export default class User extends Model {
	@Column()
	@Length(3, 255)
	@IsEmail()
	email: string;

	@Column()
	@Length(8, 255)
	password: string;

	constructor(email: string, password: string) {
		super();
		this.email = email;
		this.password = password;
	}

	toInsensitiveJSON() {
		return { id: this.id, email: this.email };
	}

	static async getAll() {
		return await getRepository(this).find();
	}

	static async findById(userId: string) {
		return await getRepository(this).findOne(userId);
	}

	static async findBy(options: Object) {
		return await getRepository(this).find(options);
	}
}

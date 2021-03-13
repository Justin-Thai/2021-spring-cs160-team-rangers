import { IsInt, IsString, IsBoolean, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import Model from './Model';
import User from './User';

@Entity('decks')
export default class Deck extends Model {
	@PrimaryGeneratedColumn({ type: 'integer' })
	id: string;

	@Column()
	user_id: string;

	@Column()
	@IsString()
	@Length(1, 255)
	name: string;

	@Column({ type: 'integer' })
	@IsInt()
	count: number;

	@Column()
	@IsBoolean()
	shared: boolean;

	@ManyToOne(() => User, (user) => user.decks)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: User;

	constructor(user_id: string, name: string) {
		super();
		this.user_id = user_id;
		this.name = name;
		this.count = 0;
		this.shared = false;
	}
}

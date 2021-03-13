import { IsInt, IsString, IsBoolean, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, getRepository } from 'typeorm';

import Model from './Model';
import User from './User';
import Card from './Card';

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

	@OneToMany(() => Card, (card) => card.deck)
	cards: Card[];

	constructor(user_id: string, name: string, shared = false) {
		super();
		this.user_id = user_id;
		this.name = name;
		this.count = 0;
		this.shared = shared;
	}

	async getCards() {
		return await getRepository(Card)
			.createQueryBuilder('card')
			.leftJoin('card.deck', 'deck')
			.where({ deck_id: this.id })
			.getMany();
	}
}

import { IsEmail, Length, IsString } from 'class-validator';
import { Entity, Column, getRepository, PrimaryColumn, BeforeInsert, OneToMany, Like } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Model from './Model';
import Deck from './Deck';

@Entity('users')
export default class User extends Model {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column()
	@Length(3, 255)
	@IsEmail()
	email: string;

	@Column()
	@IsString()
	@Length(8, 255)
	password: string;

	@OneToMany(() => Deck, (deck) => deck.user)
	decks: Deck[];

	@BeforeInsert()
	createUuid() {
		this.id = uuid();
	}

	constructor(email: string, password: string) {
		super();
		this.email = email;
		this.password = password;
	}

	toInsensitiveJSON() {
		return { id: this.id, email: this.email };
	}

	async getDecks(limit: number, page: number) {
		return await getRepository(Deck)
			.createQueryBuilder('deck')
			.select([
				'deck.id',
				'deck.name',
				'deck.count',
				'deck.shared',
				'deck.created_at',
				'deck.updated_at',
				'user.id',
				'user.email',
			])
			.leftJoin('deck.user', 'user')
			.where({ user_id: this.id })
			.orderBy('deck.updated_at', 'DESC')
			.skip((page - 1) * limit).take(limit)
			.getMany();
	}

	async getDeckById(deckId: number) {
		return await getRepository(Deck)
			.createQueryBuilder('deck')
			.select([
				'deck.id',
				'deck.name',
				'deck.count',
				'deck.shared',
				'deck.created_at',
				'deck.updated_at',
				'user.id',
				'user.email',
			])
			.leftJoin('deck.user', 'user')
			.where({ user_id: this.id, id: deckId })
			.getOne();
	}

	async filterDeckByName(name: string, limit: number, page: number) {
		return await getRepository(Deck)
			.createQueryBuilder('deck')
			.select([
				'deck.id',
				'deck.name',
				'deck.count',
				'deck.shared',
				'deck.created_at',
				'deck.updated_at',
				'user.id',
				'user.email',
			])
			.leftJoin('deck.user', 'user')
			.where({ user_id: this.id, name: Like(`%${name}%`) })
			.orderBy('deck.updated_at', 'DESC')
			.skip((page - 1) * limit).take(limit)
			.getMany();
	}
}

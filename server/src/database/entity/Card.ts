import { IsInt, IsString, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import Model from './Model';
import Deck from './Deck';

@Entity('cards')
export default class Card extends Model {
	@PrimaryGeneratedColumn({ type: 'integer' })
	id: number;

	@Column()
	@IsInt()
	deck_id: number;

	@Column()
	@IsString()
	@Length(1, 255)
	front_side: string;

	@Column()
	@IsString()
	back_side: string;

	@Column()
	@IsString()
	plain_back_side: string;

	@Column({ type: 'integer' })
	@IsInt()
	correct_count: number; // number of times user answered this card correctly

	@Column({ type: 'integer' })
	@IsInt()
	incorrect_count: number; // number of times user answered this card incorrectly

	@ManyToOne(() => Deck, (deck) => deck.cards, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'deck_id', referencedColumnName: 'id' })
	deck: Deck;

	constructor(deck_id: number, front_side: string, back_side: string, plain_back_side: string) {
		super();
		this.deck_id = deck_id;
		this.front_side = front_side;
		this.back_side = back_side;
		this.plain_back_side = plain_back_side;
		this.correct_count = 0;
		this.incorrect_count = 0;
	}
}

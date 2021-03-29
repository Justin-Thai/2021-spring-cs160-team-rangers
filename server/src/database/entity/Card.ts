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
	@Length(1, 255)
	back_side: string;

	@Column()
	@IsString()
	@Length(1, 20)
	background_color: string;

	@Column()
	@IsString()
	@Length(1, 20)
	font_color: string;

	@Column()
	@IsString()
	@Length(1, 255)
	font: string;

	@Column({ type: 'integer' })
	@IsInt()
	correct_count: number;

	@ManyToOne(() => Deck, (deck) => deck.cards)
	@JoinColumn({ name: 'deck_id', referencedColumnName: 'id' })
	deck: Deck;

	constructor(
		deck_id: number,
		front_side: string,
		back_side: string,
		background_color = 'white',
		font_color = 'black',
		font = 'Arial'
	) {
		super();
		this.deck_id = deck_id;
		this.front_side = front_side;
		this.back_side = back_side;
		this.background_color = background_color;
		this.font = font;
		this.font_color = font_color;
    	this.correct_count = 0;
	}
}

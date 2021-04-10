import { IsInt, IsString, IsUUID, IsBoolean, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, getRepository, Like } from 'typeorm';

import Model from './Model';
import User from './User';
import Card from './Card';
import StudyReport from './StudyReport';

@Entity('decks')
export default class Deck extends Model {
	@PrimaryGeneratedColumn({ type: 'integer' })
	id: number;

	@Column({ type: 'uuid' })
	@IsUUID()
	user_id: string;

	@Column()
	@IsString()
	@Length(1, 255)
	name: string;

	@Column({ type: 'integer' })
	@IsInt()
	card_count: number;

	@Column({ type: 'integer' })
	@IsInt()
	report_count: number;

	@Column()
	@IsBoolean()
	shared: boolean;

	@ManyToOne(() => User, (user) => user.decks)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: User;

	@OneToMany(() => Card, (card) => card.deck)
	cards: Card[];

	@OneToMany(() => StudyReport, (study_report) => study_report.deck)
	study_reports: StudyReport[];

	constructor(user_id: string, name: string, shared = false) {
		super();
		this.user_id = user_id;
		this.name = name;
		this.card_count = 0;
		this.report_count = 0;
		this.shared = shared;
	}

	async getCards() {
		return await getRepository(Card)
			.createQueryBuilder('card')
			.leftJoin('card.deck', 'deck')
			.where({ deck_id: this.id })
			.getMany();
	}

	async getCardById(cardId: number) {
		return await getRepository(Card)
			.createQueryBuilder('card')
			.leftJoin('card.deck', 'deck')
			.where({ deck_id: this.id, id: cardId })
			.getOne();
	}

	async filterCard(front_side: string, back_side: string) {
		let condition = {};
		if (front_side && back_side) {
			condition = { deck_id: this.id, front_side: Like(`%${front_side}%`), back_side: Like(`%${back_side}%`) };
		} else if (front_side) {
			condition = { deck_id: this.id, front_side: Like(`%${front_side}%`) };
		} else {
			condition = { deck_id: this.id, back_side: Like(`%${back_side}%`) };
		}

		return await getRepository(Card)
			.createQueryBuilder('card')
			.leftJoin('card.deck', 'deck')
			.where(condition)
			.getMany();
	}

	async deleteCards() {
		const cards = await this.getCards();
		cards.forEach(async (card) => await card.remove());
	}

	async getStudyReports(limit: number, page: number) {
		return await getRepository(StudyReport)
			.createQueryBuilder('study_report')
			.leftJoin('study_report.deck', 'deck')
			.where({ deck_id: this.id} )
			.orderBy('study_report.created_at', 'DESC')
			.skip((page - 1) * limit).take(limit)
			.getMany();
	}

	async getStudyReportById(reportId: number) {
		return await getRepository(StudyReport)
			.createQueryBuilder('study_report')
			.leftJoin('study_report.deck', 'deck')
			.where({ deck_id: this.id, id: reportId })
			.getOne();
	}

	async filterStudyReportByName(name: string, limit: number, page: number) {
		return await getRepository(StudyReport)
			.createQueryBuilder('study_report')
			.leftJoin('study_report.deck', 'deck')
			.where({ deck_id: this.id, name: Like(`%${name}%`) })
			.orderBy('study_report.created_at', 'DESC')
			.skip((page - 1) * limit).take(limit)
			.getMany();
	}
}

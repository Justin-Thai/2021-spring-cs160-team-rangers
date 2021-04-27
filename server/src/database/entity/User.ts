import { IsEmail, Length, IsString } from 'class-validator';
import { Entity, Column, getRepository, PrimaryColumn, BeforeInsert, OneToMany, Like } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Model from './Model';
import Deck from './Deck';
import StudyReport from './StudyReport';

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

	@Column()
	@IsString()
	@Length(1, 255)
	name: string;

	@Column()
	deck_count: number;

	@Column()
	report_count: number;

	@OneToMany(() => Deck, (deck) => deck.user)
	decks: Deck[];

	@OneToMany(() => StudyReport, (study_report) => study_report.user)
	study_reports: StudyReport[];

	@BeforeInsert()
	createUuid() {
		this.id = uuid();
	}

	constructor(email: string, name: string, password: string) {
		super();
		this.email = email;
		this.name = name;
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
				'deck.card_count',
				'deck.report_count',
				'deck.shared',
				'deck.created_at',
				'deck.updated_at',
				'user.id',
				'user.email',
			])
			.leftJoin('deck.user', 'user')
			.where({ user_id: this.id })
			.orderBy('deck.updated_at', 'DESC')
			.skip((page - 1) * limit)
			.take(limit)
			.getMany();
	}

	async getDeckById(deckId: number) {
		return await getRepository(Deck)
			.createQueryBuilder('deck')
			.select([
				'deck.id',
				'deck.name',
				'deck.card_count',
				'deck.report_count',
				'deck.shared',
				'deck.created_at',
				'deck.updated_at',
				'deck.user_id',
			])
			.leftJoin('deck.user', 'user')
			.where({ user_id: this.id, id: deckId })
			.getOne();
	}

	async filterDeckByName(name: string, limit = 9, page = 1) {
		return await getRepository(Deck)
			.createQueryBuilder('deck')
			.select([
				'deck.id',
				'deck.name',
				'deck.card_count',
				'deck.report_count',
				'deck.shared',
				'deck.created_at',
				'deck.updated_at',
				'user.id',
				'user.email',
			])
			.leftJoin('deck.user', 'user')
			.where({ user_id: this.id, name: Like(`%${name}%`) })
			.orderBy('deck.updated_at', 'DESC')
			.skip((page - 1) * limit)
			.take(limit)
			.getMany();
	}

	async getUserStudyReports(limit = 9, page = 1) {
		return await getRepository(StudyReport)
			.createQueryBuilder('study_report')
			.leftJoin('study_report.user', 'user')
			.where({ user_id: this.id})
			.orderBy('study_report.created_at', 'DESC')
			.skip((page - 1) * limit).take(limit)
			.getMany();
	}

	async filterStudyReportByName(name: string, limit = 9, page = 1) {
		return await getRepository(StudyReport)
			.createQueryBuilder('study_report')
			.leftJoin('study_report.user', 'user')
			.where({ user_id: this.id, name: Like(`%${name}%`) })
			.orderBy('study_report.created_at', 'DESC')
			.skip((page - 1) * limit).take(limit)
			.getMany();
	}

	async getUserStudyReportById(reportId: number) {
		return await getRepository(StudyReport)
			.createQueryBuilder('study_report')
			.leftJoin('study_report.user', 'user')
			.where({ user_id: this.id, id: reportId })
			.getOne();
	}
}

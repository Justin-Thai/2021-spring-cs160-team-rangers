import { BaseEntity, BeforeInsert, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { nanoid } from 'nanoid';

export default abstract class Model extends BaseEntity {
	@PrimaryColumn({ type: 'char' })
	id: string;

	@Column({ type: 'uuid' })
	uuid: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeInsert()
	createId() {
		this.id = nanoid(10);
	}

	@BeforeInsert()
	createUuid() {
		this.uuid = uuid();
	}

	constructor(model?: Partial<any>) {
		super();
		Object.assign(this, model);
	}

	toCompleteJSON() {
		return { ...this };
	}
}

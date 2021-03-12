import { BaseEntity, BeforeInsert, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export default abstract class Model extends BaseEntity {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeInsert()
	createUuid() {
		this.id = uuid();
	}

	constructor(model?: Partial<any>) {
		super();
		Object.assign(this, model);
	}

	toCompleteJSON() {
		return { ...this };
	}
}

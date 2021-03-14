import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class Model extends BaseEntity {
	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor(model?: Partial<any>) {
		super();
		Object.assign(this, model);
	}

	toCompleteJSON() {
		return { ...this };
	}
}

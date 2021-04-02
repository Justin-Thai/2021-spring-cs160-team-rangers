import { MigrationInterface, QueryRunner } from 'typeorm';

export class CardRefactor1617397068971 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "cards" ALTER COLUMN "back_side" TYPE VARCHAR, ALTER COLUMN "back_side" SET NOT NULL;`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeckCountToUser1617149553065 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ADD COLUMN "deck_count" INTEGER NOT NULL DEFAULT 0 CHECK("deck_count" >= 0);`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "deck_count"`);
	}
}

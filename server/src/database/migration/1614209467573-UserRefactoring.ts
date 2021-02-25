import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefactoring1614209467573 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" RENAME "updatedAt" to "updated_at";`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" RENAME "updated_at" to "updatedAt";`);
	}
}

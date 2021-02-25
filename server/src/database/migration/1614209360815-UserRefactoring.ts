import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefactoring1614209360815 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" RENAME "createdAt" to "created_at";`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" RENAME "created_at" to "createdAt";`);
	}
}

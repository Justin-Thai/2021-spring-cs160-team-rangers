import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRename1613509213043 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" RENAME TO "user";`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "users";`);
    }
}

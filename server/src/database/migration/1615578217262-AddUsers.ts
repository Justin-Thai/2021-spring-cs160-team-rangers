import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsers1615578217262 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "users" (
            "id" UUID PRIMARY KEY NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            "email" VARCHAR(255) NOT NULL,
            "password" VARCHAR(255) NOT NULL
        );`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
	}
}

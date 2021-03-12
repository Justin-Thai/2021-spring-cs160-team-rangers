import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUser1615576407580 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" (
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

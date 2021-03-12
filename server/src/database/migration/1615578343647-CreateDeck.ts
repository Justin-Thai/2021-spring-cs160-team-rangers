import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDeck1615578343647 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "decks" (
            "id" UUID PRIMARY KEY NOT NULL,
            "user_id" UUID NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            "name" VARCHAR(255) NOT NULL,
            "count" INTEGER NOT NULL DEFAULT 0 CHECK("count" >= 0),
            "shared" BOOLEAN NOT NULL DEFAULT FALSE,
            CONSTRAINT fk_user
                FOREIGN KEY(user_id)
                REFERENCES users(id))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "decks"`);
    }

}

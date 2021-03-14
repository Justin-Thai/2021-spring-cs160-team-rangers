import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCards1615579057340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cards" (
            "id" UUID PRIMARY KEY NOT NULL,
            "deck_id" UUID NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            "front_side" VARCHAR(255) NOT NULL,
            "back_side" VARCHAR(255) NOT NULL,
            "background_color" VARCHAR(20) NOT NULL DEFAULT 'white',
            "font" VARCHAR(255) NOT NULL DEFAULT 'Arial',
            "font_color" VARCHAR(20) NOT NULL DEFAULT 'black',
            "correct_count" INTEGER NOT NULL DEFAULT 0 CHECK("correct_count" >= 0),
            CONSTRAINT fk_deck
                FOREIGN KEY(deck_id)
                REFERENCES decks(id))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "cards"`);
    }

}

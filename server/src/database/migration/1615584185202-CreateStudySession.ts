import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStudySession1615584185202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "study_sessions" (
            "id" UUID PRIMARY KEY NOT NULL,
            "deck_id" UUID NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            "ended_at" TIMESTAMP NOT NULL,
            "correct_count" INTEGER NOT NULL DEFAULT 0 CHECK("correct_count" >= 0),
            CONSTRAINT fk_deck
                FOREIGN KEY(deck_id)
                REFERENCES decks(id))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

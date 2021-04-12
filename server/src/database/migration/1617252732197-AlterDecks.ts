import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterDecks1617252732197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "decks" RENAME COLUMN "count" TO "card_count"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

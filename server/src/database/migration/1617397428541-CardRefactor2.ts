import { MigrationInterface, QueryRunner } from 'typeorm';

export class CardRefactor21617397428541 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "cards" DROP COLUMN "background_color", DROP COLUMN "font", DROP COLUMN "font_color";`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}

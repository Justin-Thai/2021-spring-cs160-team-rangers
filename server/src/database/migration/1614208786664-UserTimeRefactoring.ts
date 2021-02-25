import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTimeRefactoring1614208786664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT NOW(),
                                                    ALTER COLUMN "updatedAt" SET DEFAULT NOW();`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET NOT NULL,
                                                    ALTER COLUMN "updatedAt" SET NOT NULL;`);
    }

}

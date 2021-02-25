import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactoring1614240389805 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTANT "id";
                                ALTER TABLE "user" ALTER COLUMN "id" TYPE CHAR(10);
                                ALTER TABLE "user" ADD PRIMARY KEY(id);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

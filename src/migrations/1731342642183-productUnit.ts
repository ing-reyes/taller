import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductUnit1731342642183 implements MigrationInterface {
    name = 'ProductUnit1731342642183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "unit" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "unit" double precision NOT NULL DEFAULT '0'`);
    }

}

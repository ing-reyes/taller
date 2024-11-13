import { MigrationInterface, QueryRunner } from "typeorm";

export class Relations1731522946311 implements MigrationInterface {
    name = 'Relations1731522946311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "supplier_id" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_97bbe59fdd40a53bd9c95b6c01b" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_97bbe59fdd40a53bd9c95b6c01b"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "supplier_id"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDateDiscount1735505156757 implements MigrationInterface {
  name = 'UpdateDateDiscount1735505156757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "start_date"`);
    await queryRunner.query(
      `ALTER TABLE "discount" ADD "start_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "end_date"`);
    await queryRunner.query(
      `ALTER TABLE "discount" ADD "end_date" TIMESTAMP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "end_date"`);
    await queryRunner.query(
      `ALTER TABLE "discount" ADD "end_date" date NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "start_date"`);
    await queryRunner.query(
      `ALTER TABLE "discount" ADD "start_date" date NOT NULL`,
    );
  }
}

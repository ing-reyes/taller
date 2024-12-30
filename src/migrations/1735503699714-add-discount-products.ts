import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDiscountProducts1735503699714 implements MigrationInterface {
  name = 'AddDiscountProducts1735503699714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "discount_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "product_id" uuid, "discount_id" uuid, CONSTRAINT "PK_c1c9c77ff87b66b7ac5cb3f15e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "discount_products" ADD CONSTRAINT "FK_8857bc50a51861e155ce58ca410" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "discount_products" ADD CONSTRAINT "FK_19155613d001de1ce3da8875d57" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "discount_products" DROP CONSTRAINT "FK_19155613d001de1ce3da8875d57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "discount_products" DROP CONSTRAINT "FK_8857bc50a51861e155ce58ca410"`,
    );
    await queryRunner.query(`DROP TABLE "discount_products"`);
  }
}

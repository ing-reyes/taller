import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrders1735436113022 implements MigrationInterface {
    name = 'AddOrders1735436113022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "order_date" TIMESTAMP NOT NULL, "customer_id" uuid, "employee_id" uuid, "shipper_id" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_08cafdcbae0d6407effc99cf7aa" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_f1c2079aca31a2cae19e1f68a9c" FOREIGN KEY ("shipper_id") REFERENCES "shipper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_f1c2079aca31a2cae19e1f68a9c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_08cafdcbae0d6407effc99cf7aa"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}

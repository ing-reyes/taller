import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeliveryOrders1735445596088 implements MigrationInterface {
    name = 'AddDeliveryOrders1735445596088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "delivery_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "order_id" uuid, "delivery_id" uuid, CONSTRAINT "PK_29e637736a0b5f36946edec3650" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "delivery_orders" ADD CONSTRAINT "FK_a7ffbb3e94d2236a949869631ac" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_orders" ADD CONSTRAINT "FK_1e263d78e38307acab36b5dbae9" FOREIGN KEY ("delivery_id") REFERENCES "delivery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_orders" DROP CONSTRAINT "FK_1e263d78e38307acab36b5dbae9"`);
        await queryRunner.query(`ALTER TABLE "delivery_orders" DROP CONSTRAINT "FK_a7ffbb3e94d2236a949869631ac"`);
        await queryRunner.query(`DROP TABLE "delivery_orders"`);
    }

}

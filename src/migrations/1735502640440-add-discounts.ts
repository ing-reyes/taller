import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDiscounts1735502640440 implements MigrationInterface {
    name = 'AddDiscounts1735502640440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "discount" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "name" character varying(100) NOT NULL, "description" text, "percentage" double precision NOT NULL, "amount" double precision NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, CONSTRAINT "PK_d05d8712e429673e459e7f1cddb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "discount"`);
    }

}

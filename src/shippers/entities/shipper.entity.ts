import { Column, Entity } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";

@Entity("shipper")
export class ShipperEntity extends BaseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    phone?: string;
}

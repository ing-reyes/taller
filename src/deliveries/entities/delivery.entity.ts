import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { ShipperEntity } from "./../../shippers/entities/shipper.entity";

@Entity("delivery")
export class DeliveryEntity extends BaseEntity {
    @OneToOne(() => ShipperEntity, (shipper) => shipper.delivery)
    @JoinColumn({ name: "shipper_id" })
    shipper: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    address: string;

    @Column({ type: "float", default: 0 })
    shoppingCost: number;
}

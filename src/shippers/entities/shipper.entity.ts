import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { OrderEntity } from "./../../orders/entities/order.entity";

@Entity("shipper")
export class ShipperEntity extends BaseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    phone?: string;

    @OneToMany(() => OrderEntity, (order) => order.shipper)
    orders: OrderEntity[];
}

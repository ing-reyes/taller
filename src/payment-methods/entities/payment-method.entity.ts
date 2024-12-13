import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { PurchaseEntity } from "./../../purchases/entities/purchase.entity";

@Entity({name: "payment_methods"})
export class PaymentMethodEntity extends BaseEntity {
    @Column({type: "varchar"})
    paymentMethod: string;

    @OneToMany(()=>PurchaseEntity, (purchase)=>purchase.paymentMethod)
    purchases: PurchaseEntity[];
}

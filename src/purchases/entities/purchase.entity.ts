import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BaseEntity } from "./../../common/config/base.entity";
import { CustomerEntity } from "./../../customers/entities/customer.entity";
import { PaymentMethodEntity } from "./../../payment-methods/entities/payment-method.entity";
import { PurchaseStatus } from "./../../common/enums/purchase-status.enum";

@Entity({name: "purchase"})
export class PurchaseEntity extends BaseEntity {
    @Column({type: "enum", enum: PurchaseStatus, default: PurchaseStatus.CREATED})
    status: PurchaseStatus;
    
    @ManyToOne(()=>CustomerEntity, (customer)=>customer.purchases)
    @JoinColumn({name: "customer_id"})
    customer:string;

    @ManyToOne(()=>PaymentMethodEntity, (method)=>method.purchases)
    @JoinColumn({name: "payment_method_id"})
    paymentMethod:string;
}
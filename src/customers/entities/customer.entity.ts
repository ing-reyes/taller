import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './../../common/config/base.entity';
import { PurchaseEntity } from './../../purchases/entities/purchase.entity';
import { OrderEntity } from './../../orders/entities/order.entity';

@Entity({ name: 'customer' })
export class CustomerEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  contact: string;
  @Column({ type: 'varchar' })
  address: string;
  @Column({ type: 'varchar' })
  city: string;
  @Column({ type: 'int', nullable: true })
  postalCode?: number;
  @Column({ type: 'varchar' })
  country: string;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
  purchases: PurchaseEntity[];

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];
}

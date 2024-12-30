import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './../../common/config/base.entity';
import { ShipperEntity } from './../../shippers/entities/shipper.entity';
import { DeliveryOrderEntity } from './../../delivery-orders/entities/delivery-order.entity';

@Entity('delivery')
export class DeliveryEntity extends BaseEntity {
  @OneToOne(() => ShipperEntity, (shipper) => shipper.delivery)
  @JoinColumn({ name: 'shipper_id' })
  shipper: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @Column({ type: 'float', default: 0 })
  shoppingCost: number;

  @OneToMany(
    () => DeliveryOrderEntity,
    (deliveryOrder) => deliveryOrder.delivery,
  )
  deliveryOrders: DeliveryOrderEntity;
}

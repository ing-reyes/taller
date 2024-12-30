import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../common/config/base.entity';
import { OrderEntity } from './../../orders/entities/order.entity';
import { DeliveryEntity } from './../../deliveries/entities/delivery.entity';

@Entity('delivery_orders')
export class DeliveryOrderEntity extends BaseEntity {
  @ManyToOne(() => OrderEntity, (order) => order.deliveryOrders)
  @JoinColumn({ name: 'order_id' })
  order: string;

  @ManyToOne(() => DeliveryEntity, (delivery) => delivery.deliveryOrders)
  @JoinColumn({ name: 'delivery_id' })
  delivery: string;
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../common/config/base.entity';
import { OrderEntity } from './../../orders/entities/order.entity';
import { ProductEntity } from './../../products/entities/product.entity';

@Entity('order_details')
export class OrderDetailEntity extends BaseEntity {
  @Column({ type: 'int', default: 0 })
  quantity?: number = 0;

  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: string;

  @ManyToOne(() => ProductEntity, (product) => product.orderDetails)
  @JoinColumn({ name: 'product_id' })
  product: string;
}

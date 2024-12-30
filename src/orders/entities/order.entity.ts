import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './../../common/config/base.entity';
import { CustomerEntity } from './../../customers/entities/customer.entity';
import { EmployeeEntity } from './../../employees/entities/employee.entity';
import { ShipperEntity } from './../../shippers/entities/shipper.entity';
import { DeliveryOrderEntity } from './../../delivery-orders/entities/delivery-order.entity';
import { OrderDetailEntity } from './../../order-details/entities/order-detail.entity';

@Entity({ name: 'order' })
export class OrderEntity extends BaseEntity {
  @Column({ type: 'timestamp', nullable: false })
  orderDate: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  customer: string;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.orders)
  employee: string;

  @ManyToOne(() => ShipperEntity, (shipper) => shipper.orders)
  @JoinColumn({ name: 'shipper_id' })
  shipper: string;

  @OneToMany(() => DeliveryOrderEntity, (deliveryOrder) => deliveryOrder.order)
  deliveryOrders: DeliveryOrderEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetailEntity[];
}

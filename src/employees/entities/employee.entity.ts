import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './../../common/config/base.entity';
import { OrderEntity } from './../../orders/entities/order.entity';

@Entity('employee')
export class EmployeeEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'timestamp', nullable: false })
  birthDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  note?: string;

  @OneToMany(() => OrderEntity, (order) => order.employee)
  orders: OrderEntity[];
}

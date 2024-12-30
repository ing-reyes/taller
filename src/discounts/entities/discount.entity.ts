import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './../../common/config/base.entity';
import { DiscountProductEntity } from './../../discount-products/entities/discount-product.entity';

@Entity('discount')
export class DiscountEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'float', nullable: false })
  percentage: number;

  @Column({ type: 'float', nullable: false })
  amount: number;

  @Column({ type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  endDate: Date;

  @OneToMany(
    () => DiscountProductEntity,
    (discountProduct) => discountProduct.discount,
  )
  discountProducts: DiscountProductEntity[];
}

import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../common/config/base.entity';
import { ProductEntity } from './../../products/entities/product.entity';
import { DiscountEntity } from './../../discounts/entities/discount.entity';

@Entity({ name: 'discount_products' })
export class DiscountProductEntity extends BaseEntity {
  @ManyToOne(() => ProductEntity, (product) => product.discountProducts)
  @JoinColumn({ name: 'product_id' })
  product: string;

  @ManyToOne(() => DiscountEntity, (discount) => discount.discountProducts)
  @JoinColumn({ name: 'discount_id' })
  discount: string;
}

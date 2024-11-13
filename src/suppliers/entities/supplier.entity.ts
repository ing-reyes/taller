import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/config/base.entity';
import { ProductEntity } from './../../products/entities/product.entity';

@Entity('supplier')
export class SupplierEntity extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    phone?: string;

    @Column({type: 'varchar'})
    email: string;
    
    @Column({type: 'varchar', nullable: true})
    address?: string;

    @OneToMany(()=>ProductEntity, (products)=>products.supplier)
    products: ProductEntity[];
}
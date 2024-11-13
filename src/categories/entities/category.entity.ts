import { ProductEntity } from "./../../products/entities/product.entity";
import { BaseEntity } from "./../../common/config/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('category')
export class CategoryEntity extends BaseEntity {
    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    description?: string;

    @OneToMany(()=>ProductEntity, (product)=> product.category )
    products: ProductEntity[];
}

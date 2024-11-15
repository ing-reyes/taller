import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { SupplierEntity } from "./../../suppliers/entities/supplier.entity";
import { CategoryEntity } from "./../../categories/entities/category.entity";
import { StockEntity } from "./../../stocks/entities/stock.entity";

@Entity('product')
export class ProductEntity extends BaseEntity {
    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar', nullable: true})
    description?: string;

    @Column({type: 'float', default: 0})
    price?: number = 0;

    @Column({type: 'int', default: 0})
    unit?: number = 0;

    @ManyToOne(()=> SupplierEntity, (supplier)=>supplier.products)
    @JoinColumn({name:'supplier_id'})
    supplier: string;

    @ManyToOne(()=> CategoryEntity, (category)=>category.products)
    @JoinColumn({name:'category_id'})
    category: string;

    @OneToMany(()=>StockEntity, (stocks)=>stocks.product)
    stocks: StockEntity[];
}

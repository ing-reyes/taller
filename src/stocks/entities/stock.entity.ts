import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { ProductEntity } from "./../../products/entities/product.entity";
import { WarehouseEntity } from "./../../warehouses/entities/warehouse.entity";

@Entity('stock')
export class StockEntity extends BaseEntity {
    @Column({type: 'int'})
    quantity: number;

    @ManyToOne(()=>ProductEntity, (product)=>product.stocks)
    @JoinColumn({name: 'product_id'})
    product: string;

    @ManyToOne(()=> WarehouseEntity, (warehouse)=>warehouse.stocks)
    @JoinColumn({name:'warehouse_id'})
    warehouse: string;
}

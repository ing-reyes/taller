import { Column, Entity, OneToMany } from "typeorm";

import { BaseEntity } from "./../../common/config/base.entity";
import { StockEntity } from "./../../stocks/entities/stock.entity";

@Entity('warehouse')
export class WarehouseEntity extends BaseEntity {
    @Column({type: 'varchar', nullable:false})
    description?: string;

    @OneToMany(()=>StockEntity, (stock)=>stock.warehouse)
    stocks: StockEntity[];
}

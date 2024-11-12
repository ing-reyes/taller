import { Column, Entity } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";

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
}

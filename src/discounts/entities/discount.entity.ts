import { Column, Entity } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";

@Entity("discount")
export class DiscountEntity extends BaseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "float", nullable: false })
    percentage: number;

    @Column({ type: "float", nullable: false })
    amount: number;

    @Column({ type: "date", nullable: false })
    startDate: Date;

    @Column({ type: "date", nullable: false })
    endDate: Date;
}

import { Column, Entity } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";

@Entity("employee")
export class EmployeeEntity extends BaseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "timestamp", nullable: false })
    birthDate: Date;

    @Column({ type: "varchar", length: 100, nullable: false })
    city:string;

    @Column({ type: "varchar", length: 100, nullable: false })
    phone:string;

    @Column({ type: "varchar", length: 100, nullable: false })
    email:string;

    @Column({ type: "varchar", length: 100, nullable: true })
    note?:string;
}

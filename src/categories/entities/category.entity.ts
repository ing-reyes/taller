import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    description?: string;

    @Column({type: 'bool'})
    isActive: boolean;
}

import { WarehouseEntity } from "../entities/warehouse.entity";

export interface ResponseAllWarehouses{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: WarehouseEntity[];
}
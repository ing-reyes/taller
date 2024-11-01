import { SupplierEntity } from "../entities/supplier.entity";

export interface ResponseAllSuppliers{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: SupplierEntity[];
}
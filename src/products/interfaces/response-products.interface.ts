import { ProductEntity } from "../entities/product.entity";

export interface ResponseAllProducts{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: ProductEntity[];
}
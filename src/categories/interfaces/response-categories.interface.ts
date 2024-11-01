import { CategoryEntity } from "../entities/category.entity";

export interface ResponseAllCategories{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: CategoryEntity[];
}
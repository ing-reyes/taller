import { StockEntity } from "../entities/stock.entity";

export interface ResponseAllStocks{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: StockEntity[];
}
import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockEntity } from './entities/stock.entity';
import { ManagerError } from './../common/errors/manager.error';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { ResponseAllStocks } from './interfaces/response-stocks.interface';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class StocksService {

  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>,
  ) { }

  async create(createStockDto: CreateStockDto): Promise<ApiOneResponse<StockEntity>> {

    try {
      const stock = await this.stockRepository.save(createStockDto);
      if (!stock) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Stock not created!',
        });
      }

      return {
        status: {
          statusMsg: "CREATED",
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: stock,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<StockEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {

      const [total, data] = await Promise.all([
        this.stockRepository.count({ where: { isActive: true } }),
        this.stockRepository.find({ where: { isActive: true }, take: limit, skip: skip })
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        meta: {
          page,
          limit,
          lastPage,
          total,
        },
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<ApiOneResponse<StockEntity>> {
    try {
      const stock = await this.stockRepository.createQueryBuilder('stock')
      .where({id, isActive:true})
      .getOne()
      if (!stock) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "Stock not found",
        })
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: stock,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateStockDto: UpdateStockDto):Promise<ApiOneResponse<UpdateResult>> {
    try {
      const stock = await this.stockRepository.update({id, isActive: true}, updateStockDto)
      if (stock.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Stock not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: stock,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string):Promise<ApiOneResponse<UpdateResult>> {
    try {
      const stock = await this.stockRepository.update({id, isActive: true}, { isActive: false });
      if (stock.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Stock not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: stock,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

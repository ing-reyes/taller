import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseEntity } from './entities/warehouse.entity';
import { ManagerError } from './../common/errors/manager.error';
import { ResponseAllWarehouses } from './interfaces/response-warehouses.interface';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';

@Injectable()
export class WarehousesService {

  constructor(
    @InjectRepository(WarehouseEntity)
    private readonly warehouseRepository: Repository<WarehouseEntity>,
  ){}

  async create(createWarehouseDto: CreateWarehouseDto): Promise<WarehouseEntity> {
    try {
      const warehouse = await this.warehouseRepository.save(createWarehouseDto);
      if (!warehouse) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Warehouse not created!',
        });
      }

      return warehouse;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll( paginationDto: PaginationDto ): Promise<ResponseAllWarehouses> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {

      const [total, data] = await Promise.all([
        this.warehouseRepository.count({ where: { isActive: true } }),
        this.warehouseRepository.find({ where: { isActive: true }, take: limit, skip: skip })
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<WarehouseEntity> {
    try {
      const warehouse = await this.warehouseRepository.createQueryBuilder('warehouse')
      .where({id, isActive:true})
      .getOne()
      if (!warehouse) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "warehouse not found",
        })
      }

      return warehouse
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateWarehouseDto: UpdateWarehouseDto):Promise<UpdateResult> {
    try {
      const warehouse = await this.warehouseRepository.update({id, isActive: true}, updateWarehouseDto)
      if (warehouse.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }

      return warehouse;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string):Promise<UpdateResult> {
    try {
      const warehouse = await this.warehouseRepository.update({id, isActive: true}, { isActive: false });
      if (warehouse.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }

      return warehouse;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

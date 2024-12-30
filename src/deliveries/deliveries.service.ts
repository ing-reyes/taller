import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import {
  ApiAllResponse,
  ApiOneResponse,
} from './../common/interfaces/api-response.interface';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryEntity } from './entities/delivery.entity';
import { ManagerError } from '../common/errors/manager.error';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(DeliveryEntity)
    private readonly deliveriesRepository: Repository<DeliveryEntity>,
  ) {}

  async create(
    createDeliveryDto: CreateDeliveryDto,
  ): Promise<ApiOneResponse<DeliveryEntity>> {
    try {
      const delivery = await this.deliveriesRepository.save(createDeliveryDto);
      if (!delivery) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Delivery not created!',
        });
      }

      return {
        status: {
          statusMsg: 'CREATED',
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: delivery,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<ApiAllResponse<DeliveryEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.deliveriesRepository.count({ where: { isActive: true } }),
        this.deliveriesRepository
          .createQueryBuilder('delivery')
          .leftJoinAndSelect('delivery.shipper', 'shipper')
          .leftJoinAndSelect('delivery.deliveryOrder', 'deliveryOrder')
          .where({ isActive: true })
          .skip(skip)
          .limit(limit)
          .getMany(),
      ]);
      const lastPage = Math.ceil(page / limit);
      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        meta: {
          page,
          lastPage,
          limit,
          total,
        },
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<ApiOneResponse<DeliveryEntity>> {
    try {
      const delivery = await this.deliveriesRepository
        .createQueryBuilder('delivery')
        .leftJoinAndSelect('delivery.shipper', 'shipper')
        .leftJoinAndSelect('delivery.deliveryOrder', 'deliveryOrder')
        .where({ id, isActive: true })
        .getOne();

      if (!delivery) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Delivery not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: delivery,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(
    id: string,
    updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const delivery = await this.deliveriesRepository.update(
        { id, isActive: true },
        updateDeliveryDto,
      );
      if (delivery.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Delivery not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: delivery,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const delivery = await this.deliveriesRepository.update(
        { id, isActive: true },
        { isActive: false },
      );
      if (delivery.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Delivery not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: delivery,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

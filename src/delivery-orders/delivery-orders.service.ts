import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeliveryOrderDto } from './dto/create-delivery-order.dto';
import { UpdateDeliveryOrderDto } from './dto/update-delivery-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryOrderEntity } from './entities/delivery-order.entity';
import { Repository, UpdateResult } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import {
  ApiAllResponse,
  ApiOneResponse,
} from './../common/interfaces/api-response.interface';
import { ManagerError } from './../common/errors/manager.error';

@Injectable()
export class DeliveryOrdersService {
  constructor(
    @InjectRepository(DeliveryOrderEntity)
    private readonly deliveryOrdersRepository: Repository<DeliveryOrderEntity>,
  ) {}

  async create(
    createDeliveryOrderDto: CreateDeliveryOrderDto,
  ): Promise<ApiOneResponse<DeliveryOrderEntity>> {
    try {
      const delivery = await this.deliveryOrdersRepository.save(
        createDeliveryOrderDto,
      );
      if (!delivery) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Delivery order not created!',
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
  ): Promise<ApiAllResponse<DeliveryOrderEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.deliveryOrdersRepository.count({ where: { isActive: true } }),
        this.deliveryOrdersRepository
          .createQueryBuilder('deliveryOrder')
          .leftJoinAndSelect('deliveryOrder.order', 'order')
          .leftJoinAndSelect('deliveryOrder.delivery', 'delivery')
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

  async findOne(id: string): Promise<ApiOneResponse<DeliveryOrderEntity>> {
    try {
      const delivery = await this.deliveryOrdersRepository
        .createQueryBuilder('deliveryOrder')
        .leftJoinAndSelect('deliveryOrder.order', 'shipper')
        .leftJoinAndSelect('deliveryOrder.delivery', 'delivery')
        .where({ id, isActive: true })
        .getOne();

      if (!delivery) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Delivery order not found!',
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
    updateDeliveryOrderDto: UpdateDeliveryOrderDto,
  ): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const delivery = await this.deliveryOrdersRepository.update(
        { id, isActive: true },
        updateDeliveryOrderDto,
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
      const delivery = await this.deliveryOrdersRepository.update(
        { id, isActive: true },
        { isActive: false },
      );
      if (delivery.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Delivery order not found!',
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

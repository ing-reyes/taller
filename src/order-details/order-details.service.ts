import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order-detail.entity';
import { Repository, UpdateResult } from 'typeorm';
import {
  ApiAllResponse,
  ApiOneResponse,
} from './../common/interfaces/api-response.interface';
import { ManagerError } from './../common/errors/manager.error';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailsRepository: Repository<OrderDetailEntity>,
  ) {}

  async create(
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<ApiOneResponse<OrderDetailEntity>> {
    try {
      const order =
        await this.orderDetailsRepository.save(createOrderDetailDto);
      if (!order) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Order details not created!',
        });
      }

      return {
        status: {
          statusMsg: 'CREATED',
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: order,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<ApiAllResponse<OrderDetailEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.orderDetailsRepository.count({ where: { isActive: true } }),
        this.orderDetailsRepository
          .createQueryBuilder('orderDetail')
          .leftJoinAndSelect('orderDetail.order', 'order')
          .leftJoinAndSelect('orderDetail.product', 'product')
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

  async findOne(id: string): Promise<ApiOneResponse<OrderDetailEntity>> {
    try {
      const order = await this.orderDetailsRepository
        .createQueryBuilder('orderDetail')
        .leftJoinAndSelect('orderDetail.order', 'order')
        .leftJoinAndSelect('orderDetail.product', 'product')
        .where({ id, isActive: true })
        .getOne();

      if (!order) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Order details not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: order,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(
    id: string,
    updateOrderDetailDto: UpdateOrderDetailDto,
  ): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const order = await this.orderDetailsRepository.update(
        { id, isActive: true },
        updateOrderDetailDto,
      );
      if (order.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Order details not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: order,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const order = await this.orderDetailsRepository.update(
        { id, isActive: true },
        { isActive: false },
      );
      if (order.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Order details not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: order,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import {
  ApiAllResponse,
  ApiOneResponse,
} from './../common/interfaces/api-response.interface';
import { OrderEntity } from './entities/order.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerError } from './../common/errors/manager.error';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {}
  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<ApiOneResponse<OrderEntity>> {
    try {
      const order = await this.ordersRepository.save(createOrderDto);
      if (!order) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Order not created!',
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
  ): Promise<ApiAllResponse<OrderEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.ordersRepository.count({ where: { isActive: true } }),
        this.ordersRepository
          .createQueryBuilder('order')
          .leftJoinAndSelect('order.customer', 'customer')
          .leftJoinAndSelect('order.employee', 'employee')
          .leftJoinAndSelect('order.shipper', 'shipper')
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

  async findOne(id: string): Promise<ApiOneResponse<OrderEntity>> {
    try {
      const order = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.customer', 'customer')
        .leftJoinAndSelect('order.employee', 'employee')
        .leftJoinAndSelect('order.shipper', 'shipper')
        .where({ id, isActive: true })
        .getOne();

      if (!order) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Order not found!',
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
    updateOrderDto: UpdateOrderDto,
  ): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const order = await this.ordersRepository.update(
        { id, isActive: true },
        updateOrderDto,
      );
      if (order.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Order not found!',
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
      const order = await this.ordersRepository.update(
        { id, isActive: true },
        { isActive: false },
      );
      if (order.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Order not found!',
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

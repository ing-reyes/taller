import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import {
  ApiAllResponse,
  ApiOneResponse,
} from './../common/interfaces/api-response.interface';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { DiscountEntity } from './entities/discount.entity';
import { ManagerError } from '../common/errors/manager.error';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discountsRepository: Repository<DiscountEntity>,
  ) {}

  async create(
    createDiscountDto: CreateDiscountDto,
  ): Promise<ApiOneResponse<DiscountEntity>> {
    try {
      const discount = await this.discountsRepository.save(createDiscountDto);
      if (!discount) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Discount not created!',
        });
      }

      return {
        status: {
          statusMsg: 'CREATED',
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: discount,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<ApiAllResponse<DiscountEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.discountsRepository.count({ where: { isActive: true } }),
        this.discountsRepository
          .createQueryBuilder('discount')
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

  async findOne(id: string): Promise<ApiOneResponse<DiscountEntity>> {
    try {
      const discount = await this.discountsRepository
        .createQueryBuilder('discount')
        .where({ id, isActive: true })
        .getOne();

      if (!discount) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Discount not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: discount,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(
    id: string,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const discount = await this.discountsRepository.update(
        { id, isActive: true },
        updateDiscountDto,
      );
      if (discount.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Discount not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: discount,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const discount = await this.discountsRepository.update(
        { id, isActive: true },
        { isActive: false },
      );
      if (discount.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Discount not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: discount,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

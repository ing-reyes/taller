import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import {
  ApiAllResponse,
  ApiOneResponse,
} from 'src/common/interfaces/api-response.interface';
import { CreateDiscountProductDto } from './dto/create-discount-product.dto';
import { DiscountProductEntity } from './entities/discount-product.entity';
import { ManagerError } from '../common/errors/manager.error';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { UpdateDiscountProductDto } from './dto/update-discount-product.dto';

@Injectable()
export class DiscountProductsService {
  constructor(
    @InjectRepository(DiscountProductEntity)
    private readonly discountProductsRepository: Repository<DiscountProductEntity>,
  ) {}

  async create(
    createDiscountProductDto: CreateDiscountProductDto,
  ): Promise<ApiOneResponse<DiscountProductEntity>> {
    try {
      const discountProduct = await this.discountProductsRepository.save(
        createDiscountProductDto,
      );
      if (!discountProduct) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Product discount not created!',
        });
      }

      return {
        status: {
          statusMsg: 'CREATED',
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: discountProduct,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<ApiAllResponse<DiscountProductEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.discountProductsRepository.count({ where: { isActive: true } }),
        this.discountProductsRepository
          .createQueryBuilder('discountProduct')
          .leftJoinAndSelect('discountProduct.product', 'product')
          .leftJoinAndSelect('discountProduct.discount', 'discount')
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

  async findOne(id: string): Promise<ApiOneResponse<DiscountProductEntity>> {
    try {
      const discountProduct = await this.discountProductsRepository
        .createQueryBuilder('discountProduct')
        .leftJoinAndSelect('discountProduct.product', 'product')
        .leftJoinAndSelect('discountProduct.discount', 'discount')
        .where({ id, isActive: true })
        .getOne();

      if (!discountProduct) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Product discount not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: discountProduct,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(
    id: string,
    updateDiscountProductDto: UpdateDiscountProductDto,
  ): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const discountProduct = await this.discountProductsRepository.update(
        { id, isActive: true },
        updateDiscountProductDto,
      );
      if (discountProduct.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Product discount not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: discountProduct,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const discountProduct = await this.discountProductsRepository.update(
        { id, isActive: true },
        { isActive: false },
      );
      if (discountProduct.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Product discount not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: discountProduct,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

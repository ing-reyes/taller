import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import {
  ApiAllResponse,
  ApiOneResponse,
} from 'src/common/interfaces/api-response.interface';
import { CustomerEntity } from './entities/customer.entity';
import { ManagerError } from 'src/common/errors/manager.error';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,
  ) {}
  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<ApiOneResponse<CustomerEntity>> {
    try {
      const customer = await this.customersRepository.save(createCustomerDto);
      if (!customer) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Customer not created!',
        });
      }

      return {
        status: {
          statusMsg: 'CREATED',
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: customer,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<ApiAllResponse<CustomerEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.customersRepository.count({ where: { isActive: true } }),
        this.customersRepository
          .createQueryBuilder('customer')
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

  async findOne(id: string): Promise<ApiOneResponse<CustomerEntity>> {
    try {
      const customer = await this.customersRepository.findOne({
        where: { id, isActive: true },
      });
      if (!customer) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Customer not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: customer,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const customer = await this.customersRepository.update(
        { id, isActive: true },
        updateCustomerDto,
      );
      if (customer.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Customer not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: customer,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const customer = await this.customersRepository.update(
        { id, isActive: true },
        { isActive: false },
      );
      if (customer.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Customer not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: customer,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

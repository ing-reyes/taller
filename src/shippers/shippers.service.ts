import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { Repository, UpdateResult } from 'typeorm';
import { ShipperEntity } from './entities/shipper.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ApiAllResponse,
  ApiOneResponse,
} from './../common/interfaces/api-response.interface';
import { ManagerError } from './../common/errors/manager.error';

@Injectable()
export class ShippersService {
  constructor(
    @InjectRepository(ShipperEntity)
    private readonly shippersRepository: Repository<ShipperEntity>,
  ) {}
  async create(
    createShipperDto: CreateShipperDto,
  ): Promise<ApiOneResponse<ShipperEntity>> {
    try {
      const shipper = await this.shippersRepository.save(createShipperDto);
      if (!shipper) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'shipper not created!',
        });
      }

      return {
        status: {
          statusMsg: 'CREATED',
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: shipper,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<ApiAllResponse<ShipperEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.shippersRepository.count({ where: { isActive: true } }),
        this.shippersRepository
          .createQueryBuilder('shipper')
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

  async findOne(id: string): Promise<ApiOneResponse<ShipperEntity>> {
    try {
      const shipper = await this.shippersRepository.findOne({
        where: { id, isActive: true },
      });
      if (!shipper) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Shipper not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: shipper,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(
    id: string,
    updateShipperDto: UpdateShipperDto,
  ): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const shipper = await this.shippersRepository.update(
        { id, isActive: true },
        updateShipperDto,
      );
      if (shipper.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Shipper not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: shipper,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const shipper = await this.shippersRepository.update(
        { id, isActive: true },
        { isActive: false },
      );
      if (shipper.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Shipper not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: shipper,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

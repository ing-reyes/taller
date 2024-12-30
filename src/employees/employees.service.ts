import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from './../common/dtos/pagination/pagination.dto';
import { Repository, UpdateResult } from 'typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerError } from '../common/errors/manager.error';
import {
  ApiAllResponse,
  ApiOneResponse,
} from './../common/interfaces/api-response.interface';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeesRepository: Repository<EmployeeEntity>,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<ApiOneResponse<EmployeeEntity>> {
    try {
      const employee = await this.employeesRepository.save(createEmployeeDto);
      if (!employee) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Employee not created!',
        });
      }

      return {
        status: {
          statusMsg: 'CREATED',
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: employee,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<ApiAllResponse<EmployeeEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.employeesRepository.count({ where: { isActive: true } }),
        this.employeesRepository
          .createQueryBuilder('employee')
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

  async findOne(id: string): Promise<ApiOneResponse<EmployeeEntity>> {
    try {
      const employee = await this.employeesRepository.findOne({
        where: { id, isActive: true },
      });
      if (!employee) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Employee not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: employee,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const employee = await this.employeesRepository.update(
        { id, isActive: true },
        updateEmployeeDto,
      );
      if (employee.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Employee not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: employee,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const employee = await this.employeesRepository.update(
        { id, isActive: true },
        { isActive: false },
      );
      if (employee.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Employee not found!',
        });
      }

      return {
        status: {
          statusMsg: 'OK',
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: employee,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

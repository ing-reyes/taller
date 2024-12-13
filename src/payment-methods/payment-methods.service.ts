import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { ApiAllResponse, ApiOneResponse } from './../common/interfaces/api-response.interface';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { ManagerError } from './../common/errors/manager.error';
import { PaginationDto } from './../common/dtos/pagination/pagination.dto';
import { PaymentMethodEntity } from './entities/payment-method.entity';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(
      @InjectRepository(PaymentMethodEntity)
      private readonly paymentMethodsRepository: Repository<PaymentMethodEntity>
    ){}
    async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<ApiOneResponse<PaymentMethodEntity>> {
      try {
        const method = await this.paymentMethodsRepository.save( createPaymentMethodDto );
        if( !method ){
          throw new ManagerError({
            type: "CONFLICT",
            message: "Payment method not created!",
          })
        }
  
        return {
          status: {
            statusMsg: "CREATED",
            statusCode: HttpStatus.CREATED,
            error: null,
          },
          data: method,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async findAll( paginationDto: PaginationDto ): Promise<ApiAllResponse<PaymentMethodEntity>> {
      const { limit, page } = paginationDto;
      const skip = ( page - 1 ) * limit;
  
      try {
        
        const [ total, data ] = await Promise.all([
          this.paymentMethodsRepository.count({where: {isActive:true}}),
          this.paymentMethodsRepository.createQueryBuilder("paymentMethods")
          .where({isActive: true})
          .skip(skip)
          .limit(limit)
          .getMany(),
        ]);
        const lastPage = Math.ceil( page / limit );
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          meta: {
            page,
            lastPage,
            limit,
            total
          },
          data
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async findOne(id: string): Promise<ApiOneResponse<PaymentMethodEntity>> {
      try {
        const method = await this.paymentMethodsRepository.findOne( { where: {id, isActive: true} } );
        if( !method ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "Payment method not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: method,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<ApiOneResponse<UpdateResult>> {
      try {
        const method = await this.paymentMethodsRepository.update( {id, isActive: true}, updatePaymentMethodDto );
        if( method.affected === 0 ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "Payment method not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: method,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
      try {
        const method = await this.paymentMethodsRepository.update( {id, isActive: true}, {isActive: false} );
        if( method.affected === 0 ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "Payment method not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: method,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
}

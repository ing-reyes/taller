import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { ApiAllResponse, ApiOneResponse } from './../common/interfaces/api-response.interface';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ManagerError } from '../common/errors/manager.error';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { PurchaseEntity } from './entities/purchase.entity';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
      @InjectRepository(PurchaseEntity)
      private readonly purchasesRepository: Repository<PurchaseEntity>
    ){}
    async create(createPurchaseDto: CreatePurchaseDto): Promise<ApiOneResponse<PurchaseEntity>> {
      try {
        const purchase = await this.purchasesRepository.save( createPurchaseDto );
        if( !purchase ){
          throw new ManagerError({
            type: "CONFLICT",
            message: "Purchase not created!",
          })
        }
  
        return {
          status: {
            statusMsg: "CREATED",
            statusCode: HttpStatus.CREATED,
            error: null,
          },
          data: purchase,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async findAll( paginationDto: PaginationDto ): Promise<ApiAllResponse<PurchaseEntity>> {
      const { limit, page } = paginationDto;
      const skip = ( page - 1 ) * limit;
  
      try {
        
        const [ total, data ] = await Promise.all([
          this.purchasesRepository.count({where: {isActive:true}}),
          this.purchasesRepository.createQueryBuilder("purchase")
          .where({isActive: true})
          .leftJoinAndSelect("purchase.customer","customer")
          .leftJoinAndSelect("purchase.paymentMethod","paymentMethod")
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
  
    async findOne(id: string): Promise<ApiOneResponse<PurchaseEntity>> {
      try {
        const purchase = await this.purchasesRepository.createQueryBuilder("purchase")
        .where({ id, isActive: true })
        .leftJoinAndSelect("purchase.customer","customer")
        .leftJoinAndSelect("purchase.paymentMethod","paymentMethod")
        .getOne()
        if( !purchase ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "Purchase not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: purchase,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<ApiOneResponse<UpdateResult>> {
      try {
        const purchase = await this.purchasesRepository.update( {id, isActive: true}, updatePurchaseDto );
        if( purchase.affected === 0 ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "Purchase not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: purchase,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
  
    async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
      try {
        const purchase = await this.purchasesRepository.update( {id, isActive: true}, {isActive: false} );
        if( purchase.affected === 0 ){
          throw new ManagerError({
            type: "NOT_FOUND",
            message: "Purchase not found!",
          })
        }
  
        return {
          status: {
            statusMsg: "OK",
            statusCode: HttpStatus.OK,
            error: null,
          },
          data: purchase,
        }
      } catch (error) {
        ManagerError.createSignatureError(error.message);
      }
    }
}

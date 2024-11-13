import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { ManagerError } from 'src/common/errors/manager.error';
import { ResponseAllCategories } from './interfaces/response-categories.interface';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    
    try {
      const category = await this.categoryRepository.save(createCategoryDto)
      if( !category ){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Category not created!',
        })
      }

      return category;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllCategories> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {

      //const total = await this.categoryRepository.count( { where: {isActive: true} } );
      //const data = await this.categoryRepository.find({ where: {isActive: true}, take: limit, skip: skip  })
      
      const [total, data] = await Promise.all([
        this.categoryRepository.count( { where: {isActive: true} } ),
        this.categoryRepository.find({ where: {isActive: true}, take: limit, skip: skip  })
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<CategoryEntity> {
    try {
      const category = await this.categoryRepository.createQueryBuilder('category')
      .where({id, isActive:true})
      .leftJoinAndSelect('category.products','products')
      .getOne()
      if (!category) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "Category not found",
        })
      }

      return category
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    try {
      const category = await this.categoryRepository.update({id, isActive: true}, updateCategoryDto)
      if (category.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      return category;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const category = await this.categoryRepository.update({id, isActive: true}, { isActive: false });
      if (category.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      return category;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

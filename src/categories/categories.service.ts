import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { ManagerError } from 'src/common/errors/manager.error';
import { ResponseAllCategories } from './interfaces/response-categories.interface';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';

@Injectable()
export class CategoriesService {

  private categories: CategoryEntity[] = [
    { id: 1, name: 'category1', description: 'dec1', isActive: true },
    { id: 2, name: 'category2', description: 'dec2', isActive: true },
    { id: 3, name: 'category3', description: 'dec3', isActive: true },
    { id: 4, name: 'category4', description: 'dec4', isActive: true },
    { id: 5, name: 'category5', description: 'dec5', isActive: true },
  ]

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category: CategoryEntity = {
      id: this.categories.length,
      ...createCategoryDto,
      isActive: true,
    }
    try {
      this.categories.push(category);

      return category;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllCategories> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      if (this.categories.length === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Categories not found!',
        })
      }

      const total = this.categories.filter((category) => category.isActive === true).length;
      const lastPage = Math.ceil(total / limit);
      const data = this.categories.filter((category) => category.isActive === true).slice(skip, limit);

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

  async findOne(id: number): Promise<CategoryEntity> {
    try {
      const category = this.categories.find((category) => category.id === id && category.isActive === true);
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

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const indexCategory = this.categories.findIndex((category) => category.id === id && category.isActive === true);
      if (indexCategory === -1) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      this.categories[indexCategory] = {
        ...this.categories[indexCategory],
        ...updateCategoryDto,
      }
      return this.categories[indexCategory]
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: number): Promise<CategoryEntity> {
    try {
      const indexCategory = this.categories.findIndex((category) => category.id === id && category.isActive === true);
      if (indexCategory === -1) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      this.categories[indexCategory] = {
        ...this.categories[indexCategory],
        isActive: false,
      }

      return this.categories[indexCategory]
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

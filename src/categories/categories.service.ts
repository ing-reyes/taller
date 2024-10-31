import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { ManagerError } from 'src/common/errors/manager.error';

@Injectable()
export class CategoriesService {

  private categories: CategoryEntity[] = [
    { id: 1, name: 'category1', description: 'dec1', isActive: true },
    { id: 2, name: 'category2', description: 'dec2', isActive: true },
    { id: 3, name: 'category3', description: 'dec3', isActive: true },
    { id: 4, name: 'category4', description: 'dec4', isActive: true },
    { id: 5, name: 'category5', description: 'dec5', isActive: true },
  ]

  create(createCategoryDto: CreateCategoryDto) {
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

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    try {
      const category = this.categories.find((category)=>category.id===id);
      if( !category ){
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
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

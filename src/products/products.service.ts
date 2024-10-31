import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ResponseAllProducts } from './interfaces/response-products.interface';
import { ManagerError } from 'src/common/errors/manager.error';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {

  private products: ProductEntity[] = [
    { id: 1, name: 'product1', description: 'description1', price: 10, stock: 2, isActive: true , categoryId: 1},
    { id: 2, name: 'product2', description: 'description2', price: 5, stock: 1, isActive: true , categoryId: 2},
    { id: 3, name: 'product3', description: 'description3', price: 2, stock: 2, isActive: true , categoryId: 1},
    { id: 4, name: 'product4', description: 'description4', price: 8, stock: 10, isActive: true , categoryId: 3},
    { id: 5, name: 'product5', description: 'description5', price: 15, stock: 2, isActive: false, categoryId: 1 },
    { id: 6, name: 'product6', description: 'description6', price: 15, stock: 2, isActive: false, categoryId: 4 },
    { id: 7, name: 'product7', description: 'description7', price: 15, stock: 2, isActive: true , categoryId: 1},
  ]


  constructor(
    private readonly categoriesService:CategoriesService,
  ){}


  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll( paginationDto: PaginationDto ): Promise<ResponseAllProducts> {
    const { limit, page } = paginationDto;

    try {
      if( this.products.length === 0 ){
        throw new NotFoundException('Products not found!');
      }

      const total = this.products.filter((product)=>product.isActive === true).length;
      const lastPage = Math.ceil( total / limit );

      return {
        page,
        limit,
        lastPage,
        total,
        data: this.products.filter((product)=>product.isActive === true),
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id: number) {
    try {
      const product = this.products.find((product)=>product.id === id && product.isActive === true);
      if( !product ){
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'no se econtro el producto',
        })
      }

      const category = this.categoriesService.findOne(product.categoryId);
      const { categoryId, ...rest } = product
      return {
        product: rest,
        category

      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = this.products.find((product)=>product.id === id && product.isActive===true);
      if( !product ){
        throw new NotFoundException('Product not found!');
      }

      const index = this.products.findIndex((product)=>product.id === id && product.isActive===true);

      this.products[index] = {
        id: product.id,
        name: updateProductDto.name ?  updateProductDto.name : product.name,
        description: updateProductDto.description ?  updateProductDto.description : product.description,
        price: updateProductDto.price ?  updateProductDto.price : product.price,
        stock: updateProductDto.stock ?  updateProductDto.stock : product.stock,
        categoryId: updateProductDto.categoryId ?  updateProductDto.categoryId : product.categoryId,
        isActive: product.isActive,
      };

      return `Product ${product.name} updated!`;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  remove(id: number) {
    try {
      const product = this.products.find((product)=>product.id === id && product.isActive===true);
      if( !product ){
        throw new NotFoundException('Product not found!');
      }

      this.products = this.products.filter((product)=>product.id !== id);
      return `Product ${product.name} deleted!`;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

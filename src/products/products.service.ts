import { Injectable, NotFoundException } from '@nestjs/common';

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
    { id: '1', name: 'product1', description: 'description1', price: 10, stock: 2, isActive: true,  },
    { id: '1', name: 'product2', description: 'description2', price: 5, stock: 1, isActive: true,  },
    { id: '3', name: 'product3', description: 'description3', price: 2, stock: 2, isActive: true,  },
    { id: '4', name: 'product4', description: 'description4', price: 8, stock: 10, isActive: true,  },
    { id: '5', name: 'product5', description: 'description5', price: 15, stock: 2, isActive: false,  },
    { id: '6', name: 'product6', description: 'description6', price: 15, stock: 2, isActive: false,  },
    { id: '7', name: 'product7', description: 'description7', price: 15, stock: 2, isActive: true,  },
  ];


  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    try {
      const product: ProductEntity = {
        ...createProductDto,
        isActive: true,
        id: (+this.products.length + 1).toString(),
      }

      this.products.push(product);

      return product;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllProducts> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      if (this.products.length === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Products not found!',
        });
      }

      const total = this.products.filter((product) => product.isActive === true).length;
      const lastPage = Math.ceil(total / limit);
      const data = this.products.filter((product) => product.isActive === true).slice(skip, limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<ProductEntity> {
    try {
      const product = this.products.find((product) => product.id === id && product.isActive === true);
      if (!product) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Product not found!',
        })
      }

      
      return product
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    try {
      const product = this.products.find((product) => product.id === id && product.isActive === true);
      if (!product) {
        throw new NotFoundException('Product not found!');
      }

      const indexProduct = this.products.findIndex((product) => product.id === id && product.isActive === true);

      this.products[indexProduct] = {
        ...this.products[indexProduct],
        ...updateProductDto,
      };

      return this.products[indexProduct];
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ProductEntity> {
    try {
      const indexProduct = this.products.findIndex((product) => product.id === id && product.isActive === true);
      if (indexProduct === -1) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      this.products[indexProduct] = {
        ...this.products[indexProduct],
        isActive: false,
      }

      return this.products[indexProduct]
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}

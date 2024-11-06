import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: []
})
export class ProductsModule {}

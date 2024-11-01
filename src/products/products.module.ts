import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService],
  imports: [ ProductsModule, ]
})
export class ProductsModule {}

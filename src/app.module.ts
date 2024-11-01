import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [ ProductsModule, CategoriesModule, SuppliersModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}

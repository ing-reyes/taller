import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [ UsersModule, ProductsModule, CategoriesModule, SuppliersModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}

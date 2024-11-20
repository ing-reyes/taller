import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { UsersModule } from './users/users.module';
import { DataSourceConfig } from './common/config/data.source';
import { StocksModule } from './stocks/stocks.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      envFilePath: `.env.development`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    ProductsModule, 
    CategoriesModule, 
    SuppliersModule, 
    UsersModule, StocksModule, WarehousesModule, AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
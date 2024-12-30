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
import { CustomersModule } from './customers/customers.module';
import { PurchasesModule } from './purchases/purchases.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { EmployeesModule } from './employees/employees.module';
import { ShippersModule } from './shippers/shippers.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { DeliveryOrdersModule } from './delivery-orders/delivery-orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { DiscountsModule } from './discounts/discounts.module';
import { DiscountProductsModule } from './discount-products/discount-products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV.trim()}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    ProductsModule,
    CategoriesModule,
    SuppliersModule,
    UsersModule,
    StocksModule,
    WarehousesModule,
    AuthModule,
    CustomersModule,
    PurchasesModule,
    PaymentMethodsModule,
    EmployeesModule,
    ShippersModule,
    OrdersModule,
    DeliveriesModule,
    DeliveryOrdersModule,
    OrderDetailsModule,
    DiscountsModule,
    DiscountProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

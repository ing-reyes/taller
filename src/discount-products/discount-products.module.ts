import { Module } from '@nestjs/common';
import { DiscountProductsService } from './discount-products.service';
import { DiscountProductsController } from './discount-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountProductEntity } from './entities/discount-product.entity';

@Module({
  controllers: [DiscountProductsController],
  providers: [DiscountProductsService],
  imports: [TypeOrmModule.forFeature([DiscountProductEntity])],
})
export class DiscountProductsModule {}

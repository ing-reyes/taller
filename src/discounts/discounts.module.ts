import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountEntity } from './entities/discount.entity';

@Module({
  controllers: [DiscountsController],
  providers: [DiscountsService],
  imports: [TypeOrmModule.forFeature([DiscountEntity])],
})
export class DiscountsModule {}

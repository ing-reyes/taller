import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order-detail.entity';

@Module({
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
})
export class OrderDetailsModule {}

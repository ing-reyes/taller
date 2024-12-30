import { Module } from '@nestjs/common';
import { DeliveryOrdersService } from './delivery-orders.service';
import { DeliveryOrdersController } from './delivery-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrderEntity } from './entities/delivery-order.entity';

@Module({
  controllers: [DeliveryOrdersController],
  providers: [DeliveryOrdersService],
  imports: [TypeOrmModule.forFeature([DeliveryOrderEntity])],
})
export class DeliveryOrdersModule {}

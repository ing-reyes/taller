import { Module } from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { ShippersController } from './shippers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipperEntity } from './entities/shipper.entity';

@Module({
  controllers: [ShippersController],
  providers: [ShippersService],
  imports: [TypeOrmModule.forFeature([ShipperEntity])],
})
export class ShippersModule {}

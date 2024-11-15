import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseEntity } from './entities/warehouse.entity';

@Module({
  controllers: [WarehousesController],
  providers: [WarehousesService],
  imports: [
    TypeOrmModule.forFeature([WarehouseEntity]),
  ],
})
export class WarehousesModule {}

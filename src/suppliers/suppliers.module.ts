import { Module } from '@nestjs/common';

import { SuppliersController } from "./suppliers.controller";
import { SuppliersService } from './suppliers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';

@Module({
    controllers: [SuppliersController],
    providers: [ SuppliersService ],
    imports: [
        TypeOrmModule.forFeature([SupplierEntity]),
    ],
    exports: [],
})
export class SuppliersModule {}
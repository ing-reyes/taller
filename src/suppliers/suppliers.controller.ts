import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { PaginationDto } from "src/common/dtos/pagination/pagination.dto";

@Controller('suppliers')
export class SuppliersController {

    constructor( private readonly suppliersService: SuppliersService ){}
    
    @Post()
    create( @Body() createSupplierDto: CreateSupplierDto ){
        return this.suppliersService.create(createSupplierDto);
    }

    @Get()
    findAll( @Query() paginationDto: PaginationDto ){
        return this.suppliersService.findAll( paginationDto );
    }

    @Get(':id')
    findOne( @Param('id', ParseIntPipe) id: number ){
        return this.suppliersService.findOne(id);
    }

    @Patch(':id')
    update( @Param('id', ParseIntPipe) id: number, @Body() updateSupplierDto: UpdateSupplierDto ){
        return this.suppliersService.update(id, updateSupplierDto);
    }
    
    @Delete(':id')
    remove( @Param('id', ParseIntPipe) id: number ){
        return this.suppliersService.remove(id);
    }
}





import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DiscountProductsService } from './discount-products.service';
import { CreateDiscountProductDto } from './dto/create-discount-product.dto';
import { UpdateDiscountProductDto } from './dto/update-discount-product.dto';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';

@Controller('discount-products')
export class DiscountProductsController {
  constructor(
    private readonly discountProductsService: DiscountProductsService,
  ) {}

  @Post()
  create(@Body() createDiscountProductDto: CreateDiscountProductDto) {
    return this.discountProductsService.create(createDiscountProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.discountProductsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.discountProductsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDiscountProductDto: UpdateDiscountProductDto,
  ) {
    return this.discountProductsService.update(id, updateDiscountProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.discountProductsService.remove(id);
  }
}

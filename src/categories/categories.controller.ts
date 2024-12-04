import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from './../common/dtos/pagination/pagination.dto';
import { AuthGuard } from './../auth/guards/auth.guard';
import { RoleGuard } from './../auth/guards/role.guard';
import { AdminAccess } from './../auth/decorators/admin.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@Controller('categories')
@UseGuards(AuthGuard, RoleGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @AdminAccess()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @PublicAccess()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.categoriesService.findAll( paginationDto );
  }

  @Get(':id')
  @PublicAccess()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @AdminAccess()
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @AdminAccess()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}

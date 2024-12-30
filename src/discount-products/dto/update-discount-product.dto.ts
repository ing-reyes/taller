import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscountProductDto } from './create-discount-product.dto';

export class UpdateDiscountProductDto extends PartialType(
  CreateDiscountProductDto,
) {}

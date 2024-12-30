import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDiscountProductDto {
  @IsUUID()
  @IsNotEmpty()
  product: string;

  @IsUUID()
  @IsNotEmpty()
  discount: string;
}

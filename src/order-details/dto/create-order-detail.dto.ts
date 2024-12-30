import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNumber()
  @IsOptional()
  quantity?: number = 0;

  @IsUUID()
  @IsNotEmpty()
  order: string;

  @IsUUID()
  @IsNotEmpty()
  product: string;
}

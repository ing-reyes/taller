import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsDate()
  @IsNotEmpty()
  orderDate: Date;

  @IsUUID()
  @IsNotEmpty()
  customer: string;

  @IsUUID()
  @IsNotEmpty()
  employee: string;

  @IsUUID()
  @IsNotEmpty()
  shipper: string;
}

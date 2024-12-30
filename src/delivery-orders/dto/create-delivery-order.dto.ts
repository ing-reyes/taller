import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDeliveryOrderDto {
  @IsUUID()
  @IsNotEmpty()
  order: string;

  @IsUUID()
  @IsNotEmpty()
  delivery: string;
}

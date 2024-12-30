import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShipperDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWarehouseDto {
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsString()
    @IsNotEmpty()
    stock: string;
}

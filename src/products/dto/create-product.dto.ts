import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    price: number = 0;

    @IsNumber()
    @IsOptional()
    @Min(0)
    stock: number = 0;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}

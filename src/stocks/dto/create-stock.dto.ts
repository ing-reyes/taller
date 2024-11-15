import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateStockDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    quantity: number;
    
    @IsString()
    @IsNotEmpty()
    product: string;
}

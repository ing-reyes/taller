import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto {
    @IsNumber()
    @IsOptional()
    page: number = 1;

    @IsNumber()
    @IsOptional()
    limit: number = 10;
}
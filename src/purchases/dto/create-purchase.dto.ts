import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PurchaseStatus } from "./../../common/enums/purchase-status.enum";

export class CreatePurchaseDto {
    @IsEnum(PurchaseStatus)
    status: PurchaseStatus;

    @IsString()
    @IsNotEmpty()
    customer: string;

    @IsString()
    @IsNotEmpty()
    paymentMethod: string;
}

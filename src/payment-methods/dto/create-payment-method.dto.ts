import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentMethodDto {
    @IsString()
    @IsNotEmpty()
    paymentMethod: string;
}

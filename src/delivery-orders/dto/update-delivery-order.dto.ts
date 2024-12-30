import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryOrderDto } from './create-delivery-order.dto';

export class UpdateDeliveryOrderDto extends PartialType(
  CreateDeliveryOrderDto,
) {}

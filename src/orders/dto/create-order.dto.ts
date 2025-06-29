import { IsInt, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @Type(() => Number)
  @IsInt()
  serviceId: number;

  @Type(() => Number)
  @IsInt()
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  totalPrice: number;
}

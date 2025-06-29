import { IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  serviceId: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  totalPrice: number;
}

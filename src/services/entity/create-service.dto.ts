import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  serviceName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;
}
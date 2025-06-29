import { IsString, IsOptional, IsNumber, IsUrl } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  serviceName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  executionTime?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

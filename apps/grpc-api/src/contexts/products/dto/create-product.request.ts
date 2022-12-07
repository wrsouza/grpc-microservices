import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateProductRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsInt()
  stock: number;

  @ApiProperty()
  @IsArray()
  categories: string[];
}

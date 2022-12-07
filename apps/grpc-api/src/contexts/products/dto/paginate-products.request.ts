import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginateProductsRequest {
  @ApiProperty({
    required: false,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiProperty({
    required: false,
    default: '-id',
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({
    required: false,
    default: 15,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(5)
  @Max(100)
  perPage?: number;
}

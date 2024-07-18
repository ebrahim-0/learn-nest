import { PartialType } from '@nestjs/mapped-types';
import {
  CreateProductDetailsDto,
  CreateProductsDto,
  ProductsDto,
} from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, ValidateNested } from 'class-validator';

// export class UpdateProductsDto extends PartialType(CreateProductsDto) {}

export class UpdateProductsDto extends PartialType(ProductsDto) {
  @ApiProperty({ type: CreateProductDetailsDto })
  @ValidateNested({ each: true })
  details: Partial<CreateProductDetailsDto>;
}

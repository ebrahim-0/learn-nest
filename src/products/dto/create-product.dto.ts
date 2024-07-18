import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateProductDetailsDto {
  @ApiProperty({ description: 'The color of the product' })
  @IsNotEmpty()
  color: string;
  @ApiProperty({ description: 'The price of the product' })
  @IsNotEmpty()
  price: number;
  @ApiProperty({ description: 'The size of the product' })
  @IsNotEmpty()
  size: string;
}

export class ProductsDto {
  id: number;
  @ApiProperty({ description: 'The title of the product' })
  @Length(5, 20)
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the product' })
  @Length(10, 100)
  description: string;
}

export class CreateProductsDto extends ProductsDto {
  @ApiProperty({ type: CreateProductDetailsDto })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CreateProductDetailsDto)
  details: CreateProductDetailsDto;
}

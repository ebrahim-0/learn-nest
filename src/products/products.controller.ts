import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Get, Delete, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-product.dto';
import { UpdateProductsDto } from './dto/update-product.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private _ProductsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all products',
    description: 'Retrieves all products in the inventory.',
  })
  getAllProducts(): CreateProductsDto[] {
    return this._ProductsService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  getProduct(
    @Param('id', ParseIntPipe) id: number,
  ): CreateProductsDto | { message: string } {
    return this._ProductsService.getSingleProduct(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Add a new product' })
  addProduct(
    @Body() createProductsDto: CreateProductsDto,
  ): CreateProductsDto | { message: string } {
    return this._ProductsService.addProduct(createProductsDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update an existing product' })
  updateProduct(
    @Body() updateProductsDto: UpdateProductsDto,
    @Param('id', ParseIntPipe) id: number,
  ): CreateProductsDto | { message: string } {
    return this._ProductsService.updateProduct(id, updateProductsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  deleteProduct(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this._ProductsService.deleteProduct(id);
  }
}

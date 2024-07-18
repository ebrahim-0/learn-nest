import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-product.dto';
import { UpdateProductsDto } from './dto/update-product.dto';
import { products } from 'src/data';

@Injectable()
export class ProductsService {
  private products: CreateProductsDto[] = products;

  /**
   * Retrieves all products in the inventory.
   * @returns {Product[]} An array of all product objects.
   * @example
   * getAll();
   */

  getAll(): CreateProductsDto[] {
    return this.products;
  }

  /**
   * Retrieves a single product by its ID.
   * @param {number} id - The ID of the product to retrieve.
   * @returns {Product | { message: string }} The product object if found, or an error message if not found.
   * @example
   * getSingleProduct(1);
   */

  getSingleProduct(id: number): CreateProductsDto | { message: string } {
    const product = this.products.find((product) => product.id === +id);

    if (!product) {
      return { message: 'Product not found' };
    }

    return product;
  }

  /**
   * Adds a new product to the inventory.
   * @param {CreateProductsDto} body - The product data transfer object containing title, description, and details.
   * @returns {Product | { message: string }} The newly created product object, or an error message if validation fails.
   * @example
   * addProduct({ title: 'new product', description: 'new description', details: { color: 'red', price: 10, size: 'M' } });
   */

  addProduct(body: CreateProductsDto): CreateProductsDto | { message: string } {
    const newProduct = { id: this.products.length + 1, ...body };
    this.products.push(newProduct);
    return newProduct;
  }

  /**
   * Updates an existing product by its ID.
   * @param {number} id - The ID of the product to update.
   * @param {UpdateProductsDto} body - The product data transfer object containing updated title, description, and details.
   * @returns {Product | { message: string }} The updated product object, or an error message if the product is not found or validation fails.
   * @example
   * updateProduct(1, { title: 'updated title' });
   * */

  updateProduct(
    id: number,
    body: UpdateProductsDto,
  ): CreateProductsDto | { message: string } {
    const productIndex = this.products.findIndex(
      (product) => product.id === +id,
    );

    if (productIndex === -1) {
      return { message: 'Product not found' };
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...body,
      details: { ...this.products[productIndex].details, ...body.details },
    };

    return this.products[productIndex];
  }

  /**
   * Deletes a product from the inventory by its ID.
   * @param {number} id - The ID of the product to delete.
   * @returns {{ message: string }} A success message if the product is deleted, or an error message if the product is not found.
   * @example
   * deleteProduct(1);
   */

  deleteProduct(id: number): { message: string } {
    const product = this.products.find((product) => product.id === +id);

    if (!product) {
      return { message: 'Product not found' };
    }

    this.products = this.products.filter((product) => product.id !== +id);

    return { message: 'Product deleted' };
  }
}

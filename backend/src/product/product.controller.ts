import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProduct(@Query() productDto: ProductDto) {
    return this.productService.getProduct(productDto);
  }
}

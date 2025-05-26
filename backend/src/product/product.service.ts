import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';
import { filterProduct } from './product.type';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getProduct(productDto: ProductDto): Promise<{
    message: string;
    resultCode: number;
    product: ProductDocument[];
    totalProduct: number;
  }> {
    //lọc tìm kiếm
    const { type, page, state, search, limit } = productDto;
    // tạo query động
    const query: filterProduct = {};
    if (type) {
      query.type = type;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (state) {
      query.state = state;
    }
    if (limit) {
      query.limit = limit;
    }
    // phân trang
    const skip = (page - 1) * limit;
    // tìm sản phẩm
    const products = await this.productModel
      .find(query)
      .skip(skip)
      .limit(limit);
    //trả về
    const totalProduct = await this.productModel.countDocuments(query);
    if (totalProduct == 0) {
      throw new UnauthorizedException('Product not found!');
    }
    return {
      totalProduct: totalProduct,
      message: 'Success',
      product: products,
      resultCode: 1,
    };
  }
}

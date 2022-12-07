import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  CreateProductRequest,
  CreateProductResponse,
  PaginateProductsRequest,
  PaginateProductsResponse,
  ProductDetailsRequest,
  ProductDetailsResponse,
} from './dto';

interface ProductService {
  paginateProducts(
    data: PaginateProductsRequest,
  ): Observable<PaginateProductsResponse>;

  createProduct(data: CreateProductRequest): Observable<CreateProductResponse>;

  productDetails(
    data: ProductDetailsRequest,
  ): Observable<ProductDetailsResponse>;
}

@ApiTags('Products')
@Controller('products')
export class ProductsController implements OnModuleInit {
  private productService: ProductService;

  constructor(
    @Inject('PRODUCTS_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductService>('ProductService');
  }

  @Get()
  paginateProducts(
    @Query() paginateProductRequest: PaginateProductsRequest,
  ): Observable<PaginateProductsResponse> {
    Logger.log(
      `GET paginateProducts: ${JSON.stringify(paginateProductRequest)}`,
    );
    return this.productService.paginateProducts(paginateProductRequest);
  }

  @Post()
  createProduct(
    @Body() createProductRequest: CreateProductRequest,
  ): Observable<CreateProductResponse> {
    Logger.log(`POST createProduct: ${JSON.stringify(createProductRequest)}`);
    return this.productService.createProduct(createProductRequest);
  }

  @Get(':id')
  productDetails(
    @Param() productDetailsRequest: ProductDetailsRequest,
  ): Observable<ProductDetailsResponse> {
    Logger.log(`GET productDetails: ${JSON.stringify(productDetailsRequest)}`);
    return this.productService.productDetails(productDetailsRequest);
  }
}

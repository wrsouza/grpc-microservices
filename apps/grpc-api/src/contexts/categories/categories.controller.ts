import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  CategoryDetailsRequest,
  CategoryDetailsResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
} from './dto';
import { GrpcInterceptor } from '../../data/interceptors/grpc.interceptor';

interface CategoryService {
  createCategory(
    data: CreateCategoryRequest,
  ): Observable<CreateCategoryResponse>;

  categoryDetails(
    data: CategoryDetailsRequest,
  ): Observable<CategoryDetailsResponse>;
}

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController implements OnModuleInit {
  private categoryService: CategoryService;

  constructor(
    @Inject('CATEGORIES_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.categoryService =
      this.client.getService<CategoryService>('CategoryService');
  }

  @Post()
  @UseInterceptors(new GrpcInterceptor())
  createCategory(
    @Body() createCategoryRequest: CreateCategoryRequest,
  ): Observable<CreateCategoryResponse> {
    Logger.log(`POST createCategory: ${JSON.stringify(createCategoryRequest)}`);
    return this.categoryService.createCategory(createCategoryRequest);
  }

  @Get(':id')
  @UseInterceptors(new GrpcInterceptor())
  categoryDetails(
    @Param() categoryDetailsRequest: CategoryDetailsRequest,
  ): Observable<CategoryDetailsResponse> {
    Logger.log(
      `GET categoryDetails: ${JSON.stringify(categoryDetailsRequest)}`,
    );
    return this.categoryService.categoryDetails(categoryDetailsRequest);
  }
}

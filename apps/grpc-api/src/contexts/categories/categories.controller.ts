import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
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

interface CategoryService {
  createCategory(
    data: CreateCategoryRequest,
  ): Observable<CreateCategoryResponse | BadRequestException>;

  categoryDetails(
    data: CategoryDetailsRequest,
  ): Observable<CategoryDetailsResponse | BadRequestException>;
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
  createCategory(
    @Body() createCategoryRequest: CreateCategoryRequest,
  ): Observable<CreateCategoryResponse | BadRequestException> {
    Logger.log(`POST createCategory: ${JSON.stringify(createCategoryRequest)}`);
    return this.categoryService.createCategory(createCategoryRequest);
  }

  @Get(':id')
  categoryDetails(
    @Param() categoryDetailsRequest: CategoryDetailsRequest,
  ): Observable<CategoryDetailsResponse | BadRequestException> {
    Logger.log(
      `GET categoryDetails: ${JSON.stringify(categoryDetailsRequest)}`,
    );
    return this.categoryService.categoryDetails(categoryDetailsRequest);
  }
}

import {
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
  CreateCustomerRequest,
  CreateCustomerResponse,
  CustomerDetailsRequest,
} from './dto';
import { CustomerDetailsResponse } from './dto/customer-details.response';

interface CustomerService {
  createCustomer(
    data: CreateCustomerRequest,
  ): Observable<CreateCustomerResponse>;

  customerDetails(
    data: CustomerDetailsRequest,
  ): Observable<CustomerDetailsResponse>;
}

@ApiTags('Customers')
@Controller('customers')
export class CustomersController implements OnModuleInit {
  private customersService: CustomerService;

  constructor(
    @Inject('CUSTOMERS_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.customersService =
      this.client.getService<CustomerService>('CustomerService');
  }

  @Post()
  createCustomer(
    @Body() createCustomerRequest: CreateCustomerRequest,
  ): Observable<CreateCustomerResponse> {
    Logger.log(
      `POST createCustomerRequest: ${JSON.stringify(createCustomerRequest)}`,
    );
    return this.customersService.createCustomer({ ...createCustomerRequest });
  }

  @Get(':id')
  customerDetails(
    @Param() { id }: CustomerDetailsRequest,
  ): Observable<CustomerDetailsResponse> {
    Logger.log(`POST customerDetailsRequest: ${id}`);
    return this.customersService.customerDetails({ id });
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { OrderStatusEnum } from '../enums/orderStatus.enum';

export class CreateOrderDTO {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  overall_price: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  customized_price: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  tour_id: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  discount: string;

  @ApiProperty()
  @IsDefined()
  @IsEnum(Object.values(OrderStatusEnum))
  @IsNotEmpty()
  status: string;
}

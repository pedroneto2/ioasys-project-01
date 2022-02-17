import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsNumber, Min } from 'class-validator';
import { ProducstSize } from '@shared/entities/product/productsSize.enum';
import { ProductType } from '@shared/entities/productType/productType.entity';

export class CreateProductRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  public name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public stock_count: number;

  @ApiProperty()
  @IsNotEmpty()
  public size: ProducstSize;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 200)
  public description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public price: number;

  @ApiProperty()
  @IsNotEmpty()
  public type: ProductType;
}

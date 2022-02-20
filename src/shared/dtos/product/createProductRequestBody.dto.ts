import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsNumber, Min } from 'class-validator';
import { ProductsSize } from '@shared/entities/product/productsSize.enum';
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
  public stockCount: number;

  @ApiProperty()
  @IsNotEmpty()
  public size: ProductsSize;

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
  @IsString()
  @IsNotEmpty()
  public type: ProductType['name'];
}

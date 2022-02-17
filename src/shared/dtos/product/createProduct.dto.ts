import { ProducstSize } from '@shared/entities/product/productsSize.enum';
import { ProductType } from '@shared/entities/productType/productType.entity';

export class CreateProductDTO {
  public id: string;

  public name: string;

  public stock_count: number;

  public size: ProducstSize;

  public description: string;

  public price: number;

  public type: ProductType;
}

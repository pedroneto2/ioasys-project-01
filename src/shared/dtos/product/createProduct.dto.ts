import { ProductsSize } from '@shared/entities/product/productsSize.enum';
import { ProductType } from '@shared/entities/productType/productType.entity';

export class CreateProductDTO {
  public id: string;

  public name: string;

  public stockCount: number;

  public size: ProductsSize;

  public description: string;

  public price: number;

  public type: ProductType['name'];
}

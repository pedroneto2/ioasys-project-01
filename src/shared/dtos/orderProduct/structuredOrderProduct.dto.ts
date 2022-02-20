import { ProductsSize } from '@shared/entities/product/productsSize.enum';

interface Product {
  name: string;
  type: string;
  size: ProductsSize;
  description: string;
  price: number;
  quantity: number;
  subTotal: number;
}

export class StructuredOrderProductDTO {
  public products: Product[];

  public total: number;
}

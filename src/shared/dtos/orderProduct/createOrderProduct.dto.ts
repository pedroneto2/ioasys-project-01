import { Order } from '@shared/entities/order/order.entity';
import { Product } from '@shared/entities/product/product.entity';

export class CreateOrderProductDTO {
  public id: string;

  public orderID: Order['id'];

  public productID: Product['id'];

  public quantity: number;
}
